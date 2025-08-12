<?php
// register_bridge.php  – REGISTRATION bridge (JSON)

/*-------------------------------------------------
| Respond as JSON
|-------------------------------------------------*/
header('Content-Type: application/json');

/*-------------------------------------------------
| Only allow POST
|-------------------------------------------------*/
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Metode tidak diizinkan. Gunakan POST.'
    ]);
    exit;
}

/*-------------------------------------------------
| Read payload from either form-urlencoded (_POST)
| or raw JSON (php://input).
|-------------------------------------------------*/
$rawBody = file_get_contents('php://input');
$bodyJSON = json_decode($rawBody, true) ?: [];

/* Helper: ambil nilai dari $_POST lalu fallback ke JSON */
function g(string $key, array $json) {
    return $_POST[$key] ?? ($json[$key] ?? '');
}

$firstName    = g('firstName',    $bodyJSON);
$lastName     = g('lastName',     $bodyJSON);
$dob          = g('dob',          $bodyJSON);
$email        = g('email',        $bodyJSON);
$mobileNumber = g('mobileNumber', $bodyJSON);
$region       = g('region',       $bodyJSON);
$province     = g('province',     $bodyJSON);
$privacy      = g('privacy',      $bodyJSON);
$consent      = g('consent',      $bodyJSON);

/*-------------------------------------------------
| Basic validation (mobile & email at minimum)
|-------------------------------------------------*/
if ($mobileNumber === '' || $email === '') {
    http_response_code(400);
    echo json_encode([
        'status'  => 'error',
        'message' => 'mobileNumber dan email wajib diisi.'
    ]);
    exit;
}

/*-------------------------------------------------
| Forwarder
|-------------------------------------------------*/
function forward_to_other_api(
    string $firstName,
    string $lastName,
    string $dob,
    string $email,
    string $mobileNumber,
    string $region,
    string $province,
    string $privacy,
    string $consent
) : string {

    $target_url = 'https://api.paylessxbini.com.ph/api/auth/register';

    /* Build JSON body persis seperti field di atas */
    $payload = json_encode([
        'firstName'    => $firstName,
        'lastName'     => $lastName,
        'dob'          => $dob,
        'email'        => $email,
        'mobileNumber' => $mobileNumber,
        'region'       => $region,
        'province'     => $province,
        'privacy'      => $privacy,
        'consent'      => $consent,
    ]);

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
            'content'       => $payload,
            'ignore_errors' => true,   // ambil body walau 4xx/5xx
            'timeout'       => 10
        ]
    ]);

    $result = file_get_contents($target_url, false, $context);

    return $result !== false
        ? $result                         // body asli dari upstream
        : json_encode([
            'success'  => false,
            'response' => null,
            'error'    => 'Gagal menghubungi endpoint'
        ]);
}

/*-------------------------------------------------
| Execute & stream upstream response
|-------------------------------------------------*/
echo forward_to_other_api(
    $firstName, $lastName, $dob, $email,
    $mobileNumber, $region, $province,
    $privacy, $consent
);
