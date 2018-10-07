<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\ColnectAPIService;

class APIController extends AbstractController
{

	/**
	 * @Route("/api/category_list")
	 *
	 * @param ColnectAPIService $provider
	 */
	public function categoryList(ColnectAPIService $provider)
	{
		$categoryList = $provider->getCategoryList();

		return $this->json($categoryList);
	}

	/**
	 * @Route("/api/qr_code")
	 */
	public function qrCode()
	{

	}
}
