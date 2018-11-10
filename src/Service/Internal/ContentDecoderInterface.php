<?php
namespace App\Service\Internal;

/**
 * ContentDecoder describes how string data will be decoded
 */
interface ContentDecoderInterface
{

	/**
	 * Takes string as an input and returns data in whatever format
	 *
	 * @param string $data
	 * @return mixed
	 */
	public function decode(string $data);
}
