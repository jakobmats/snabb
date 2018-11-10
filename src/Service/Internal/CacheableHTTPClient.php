<?php
namespace App\Service\Internal;

use Psr\Cache\CacheItemPoolInterface;
use Psr\Log\LoggerInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class CacheableHTTPClient
{

	/**
	 * Guzzle client instance
	 *
	 * @var Client
	 */
	private $client;

	/**
	 * Cache adapter instance
	 *
	 * @var CacheItemPoolInterface
	 */
	private $cache;

	/**
	 * Logger instance
	 *
	 * @var LoggerInterface
	 */
	private $logger;

	/**
	 * Cache key prefix to prevent typos :)
	 */
	private $cachePrefix;

	/**
	 * Service constructor
	 *
	 * @param RequestStack $requestStack
	 * @param CacheItemPoolInterface $cache
	 * @param string $key
	 * @param string $url
	 */
	public function __construct(
		CacheItemPoolInterface $cache,
		LoggerInterface $logger,
		ContentDecoderInterface $decoder,
		string $cachePrefix,
		string $url
	)
	{
		$this->client = new Client([
			'base_uri' => $url,
			'verify' => 'prod' === getenv('env'), // Allow self-signed certificates during development
			'headers' => [
				'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
			]
		]);
		$this->cache = $cache;
		$this->logger = $logger;
		$this->decoder = $decoder;
		$this->cachePrefix = $cachePrefix;
	}

	/**
	 * Download data from the Colnect API or return the cached version
	 *
	 * @param string $request
	 * @param callable $onError
	 * @return mixed
	 */
	public function request(string $request, ?array $requestData, callable $onError)
	{
		$cacheKey = \str_replace('/', '_', $request);
		$cachedItem = $this->cache->getItem($this->cachePrefix.$cacheKey);

		if (!$cachedItem->isHit()) {
			try {
				$response = $this->client->request('GET', $request, $requestData ?? []);
				$contents = (string) $response->getBody();

				// We didn't get correct JSON back
				$decoded = $this->decoder->decode($contents);
				if ($decoded === null) {
					return $onError();
				}

				$cachedItem->set($contents);
				$this->cache->save($cachedItem);

				// Return newly fetched data
				return $decoded;
			} catch (GuzzleException $e) {
				$this->logger->error($e);

				// Call custom handler
				return $onError();
			}
		}

		// Return cached data
		return $this->decoder->decode($cachedItem->get());
	}
}
