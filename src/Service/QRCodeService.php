<?php
namespace App\Service;

use Psr\Cache\CacheItemPoolInterface;
use Psr\Log\LoggerInterface;

class QRCodeService
{
	public function __construct(CacheItemPoolInterface $cache, LoggerInterface $logger)
	{
		$this->client = new Internal\CacheableHTTPClient(
			$cache,
			$logger,
			new class implements Internal\ContentDecoderInterface { // NOOP encoder
				public function decode(string $data): string
				{
					return $data;
				}
			},
			'qrcode.',
			'https://api.qrserver.com/v1'
		);
	}

	public function getCode(string $data, int $width, int $height)
	{
		return $this->client->request('/create-qr-code', [
			'data' => $data,
			'size' => "{$width}x{$height}"
		], function () {
			return '';
		});
	}
}