<?php
namespace App\Service\Internal;

/**
 * String to JSON decoder
 */
class JSONDecoder implements ContentDecoderInterface
{

	/**
	 * Decodes string data as JSON
	 *
	 * @param string $data
	 * @return array|null
	 */
	public function decode($data): ?array
	{
		return json_decode($data, true);
	}
}
