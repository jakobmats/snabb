<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;
use Psr\Cache\CacheItemPoolInterface;
use GuzzleHttp\Client;

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
	 * Cache adapter instance
	 *
	 * @var AdapterInterface
	 */
	private $cache;

	/**
	 * Cache key prefix to prevent typos :)
	 */
	private const CACHE_PREFIX = 'colnectapi.';

	/**
	 * Undocumented function
	 *
	 * @param RequestStack $requestStack
	 * @param RedisAdapter $cache
	 * @param string $key
	 * @param string $url
	 */
	public function __construct(RequestStack $requestStack, CacheItemPoolInterface $cache, string $key, string $url)
	{
		// $this->apiVar = new ColnectAPI($key, $requestStack->getCurrentRequest()->getLocale(), $url);
		$this->client = new Client([
			'base_uri' => $url.'/'.$requestStack->getCurrentRequest()->getLocale().'/'.$key
		]);
		$this->cache = $cache;
	}

	/**
	 * Return list of all Colnect categories available via the API
	 *
	 * @return array
	 */
	public function getCategoryList(): array
	{
		return $this->cachedRequest('/categories', 'categories', function () {
			return ['Error loading list'];
		});
	}

	/**
	 * Download data from the Colnect API or return the cached version
	 *
	 * @param string $request
	 * @param string $cacheKey
	 * @return void
	 */
	private function cachedRequest(string $request, string $cacheKey, \Closure $onError)
	{
		$fullCacheKey = self::CACHE_PREFIX.$cacheKey;
		if (!$this->cache->has($fullCacheKey)) {
			try {
				$item = $this->client->get($request);
				$this->cache->set($fullCacheKey, $item);

				// Return newly fetched data
				return $item;
			} catch (Exception $e) {
				$this->logApiError($e);

				// Call custom handler
				return $onError->call();
			}
		}

		// Return cached data
		return $this->cache->get($fullCacheKey);
	}

	private function logApiError(Exception $e)
	{

	}
}