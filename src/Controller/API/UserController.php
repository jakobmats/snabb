<?php
namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ColnectAPIService;

class UserController extends AbstractController
{

	/**
	 * @Route(
	 * 	"/api/users/search/{user}",
	 * 	requirements={"user"="[\w-]+"}
	 * )
	 */
	public function search(ColnectAPIService $api, string $user)
	{
		$exists = !empty($api->cachedRequest("ratings_count/collector/$user", function () {
			return false;
		}));

		return $this->json($exists);
	}

	/**
	 * @todo Demo version. Maximum of 100 items without pagination
	 * @Route(
	 * 	"/api/users/{user}/category/{category}/inv/{inv}",
	 * 	requirements={
	 * 		"user"="[\w-]+",
	 * 		"category"="[a-z]+",
	 * 		"inv"="[a-z]+"
		* }
	 * )
	 */
	public function itemList(ColnectAPIService $api, string $user, string $category, string $inv)
	{
		$itemList = $api->cachedRequest("list/cat/$category/$inv/$user", function () {
			return [];
		});

		if (empty($itemList)) {
			return $this->json(['error' => 'List is empty']);
		}

		$itemList = array_map(function ($item) {

			// Only id and item name are of any interest
			return [$item[0], $item[7]];
		}, $itemList);

		return $this->json($itemList);
	}
}