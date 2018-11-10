<?php

namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ColnectAPIService;

class CategoryController extends AbstractController
{

	/**
	 * @Route("/api/categories")
	 */
	public function categories(ColnectAPIService $api)
	{
		$categoryList = $api->cachedRequest('categories', function () {
			return ['Error loading list'];
		});

		$categoryNames = array_map(function ($category) {
			return ucwords(preg_replace('/_/', ' ', $category));
		}, $categoryList);

		$result = array_combine($categoryList, $categoryNames);
		asort($result);

		return $this->json($result);
	}
}