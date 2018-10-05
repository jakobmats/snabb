<?php
namespace App\Service;

use Jakobmats\ColnectAPI;

/**
 * Wrap Colnect API client in a Symfony service
 */
class ColnectAPIProvider
{

	/**
	 * Underlying api variable
	 *
	 * @var Jakobmats\ColnectAPI
	 */
	private $apiVar;

	public function __construct(string $key, string $url)
	{
		$this->apiVar = new ColnectAPI($key, 'en', $url);
	}

	/**
	 * Get underlying api variable
	 *
	 * @return  Jakobmats\ColnectAPI
	 */ 
	public function getApiVar()
	{
		return $this->apiVar;
	}
}