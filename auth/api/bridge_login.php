<?php
// register_bridge.php  – login bridge

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Metode tidak diizinkan. Gunakan POST.'
    ]);
    exit;
}

/*------------------------------------------
| Ambil mobileNumber dari form atau JSON
|------------------------------------------*/
$mobileNumber = $_POST['mobileNumber'] ?? '';
if ($mobileNumber === '') {
    $raw  = file_get_contents('php://input');
    $json = json_decode($raw, true);
    if (is_array($json) && isset($json['mobileNumber'])) {
        $mobileNumber = $json['mobileNumber'];
    }
}

if ($mobileNumber === '') {
    http_response_code(400);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Parameter mobileNumber wajib diisi.'
    ]);
    exit;
}

/*------------------------------------------
| Forward ke API Payless XBini
|------------------------------------------*/
function forward_to_other_api(string $mobileNumber): string
{
    $target_url = 'https://api.paylessxbini.com.ph/api/auth/login';

    /* JSON payload */
    $data = json_encode(['mobileNumber' => $mobileNumber]);

    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
        'User-Agent: php-bridge/1.0',
        'x-api-key: 0f551ef2-9943-43ac-b777-c74c4fbaf353AdsparkBini'
    ];

    $context = stream_context_create([
        'http' => [
            'header'        => implode("\r\n", $headers) . "\r\n",
            'method'        => 'POST',
            'content'       => $data,
            'ignore_errors' => true,
            'timeout'       => 10
        ]
    ]);

    $result = file_get_contents($target_url, false, $context);

    return $result !== false
        ? $result                     // body dari upstream apa adanya
        : json_encode([
            'success'  => false,
            'response' => null,
            'error'    => 'Gagal menghubungi endpoint'
        ]);
}

/*------------------------------------------*/
echo forward_to_other_api($mobileNumber);
