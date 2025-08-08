<?php
// register_bridge.php

header("Content-Type: application/json");

// Hanya izinkan method POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Metode tidak diizinkan. Gunakan POST.'
    ]);
    exit;
}

$firstName      = $_POST['firstName']     ?? '';
$lastName       = $_POST['lastName']    ?? '';
$dob            = $_POST['dob'] ?? '';
$email          = $_POST['email'] ?? '';
$mobileNumber   = $_POST['mobileNumber'] ?? '';
$region         = $_POST['region'] ?? '';
$province       = $_POST['province'] ?? '';
$privacy        = $_POST['privacy'] ?? '';
$consent        = $_POST['consent'] ?? '';

function forward_to_other_api($firstName, $lastName, $dob, $email, $mobileNumber, $region, $province, $privacy, $consent)
{
    $target_url = 'https://api.paylessxbini.com.ph/api/auth/register'; // ← ganti ke API target

    $data = http_build_query([
        'firstName' => $firstName,
        'lastName' => $lastName,
        'dob' => $dob,
        'email' => $email,
        'mobileNumber' => $mobileNumber,
        'region' => $region,
        'province' => $province,
        'privacy' => $privacy,
        'consent' => $consent,
    ]);

    $options = [
        'http' => [
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $data,
            'ignore_errors' => true // penting untuk mendapatkan response meskipun error
        ]
    ];

    $context  = stream_context_create($options);
    $result = file_get_contents($target_url, false, $context);

    if ($result === false) {
        return [
            'success' => false,
            'response' => null,
            'error' => 'Gagal menghubungi endpoint'
        ];
    }

    // Decode jika JSON
    $decoded = json_decode($result, true);

    return [
        'success' => is_array($decoded),
        'response' => $decoded ?: $result,
        'error' => $decoded ? null : 'Format response tidak dikenali'
    ];
}

forward_to_other_api($firstName, $lastName, $dob, $email, $mobileNumber, $region, $province, $privacy, $consent);

echo is_array($apiResult) ? json_encode($apiResult) : $apiResult;
