<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;
use Psr\Cache\CacheItemPoolInterface;
use Psr\Log\LoggerInterface;

/**
 * Wrap Colnect API client in a Symfony service
 */
class ColnectAPIService
{

	/**
	 * Guzzle client instance
	 *
	 * @var Client
	 */
	private $client;

	/**
	 * Service constructor
	 *
	 * @param RequestStack $requestStack
	 * @param CacheItemPoolInterface $cache
	 * @param string $key
	 * @param string $url
	 */
	public function __construct(
		RequestStack $requestStack,
		CacheItemPoolInterface $cache,
		LoggerInterface $logger,
		string $key,
		string $url)
	{
		$decoder = new Internal\JSONDecoder;
		$this->client = new Internal\CacheableHTTPClient(
			$cache,
			$logger,
			$decoder,
			'colnectapi.',
			$url.'/'.$requestStack->getCurrentRequest()->getLocale().'/api/'.$key.'/'
		);
	}

	public function cachedRequest(string $request, callable $onError)
	{
		return $this->client->request($request, null, $onError);
	}
}
