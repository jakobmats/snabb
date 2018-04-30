<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
	/**
	 * @Route("/", name="index")
	 */
	public function index()
	{
		return $this->render('index/index.html.twig', [
			'message' => 'http://snabb.lo',
		]);
	}

	/**
	 * @Route("/about", name="about")
	 */
	public function about()
	{
		return $this->render('index/about.html.twig');
	}
}
