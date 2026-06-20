<?php

declare(strict_types=1);



header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed.'
    ]);

    exit;
}



$recipientEmail = 'hello@slabway.com';
$siteName = 'SlabWay';



function clean_input(?string $value): string
{
    $value = $value ?? '';
    $value = trim($value);
    $value = strip_tags($value);
    $value = preg_replace('/\s+/', ' ', $value);

    return $value ?? '';
}

function clean_multiline(?string $value): string
{
    $value = $value ?? '';
    $value = trim($value);
    $value = strip_tags($value);
    $value = preg_replace("/\r\n|\r/", "\n", $value);
    $value = preg_replace("/[ \t]+/", ' ', $value);

    return $value ?? '';
}

function json_response(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);

    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);

    exit;
}



$fullName = clean_input($_POST['fullName'] ?? '');
$email = clean_input($_POST['email'] ?? '');
$phone = clean_input($_POST['phone'] ?? '');
$service = clean_input($_POST['service'] ?? '');
$message = clean_multiline($_POST['message'] ?? '');
$sourcePage = clean_input($_POST['sourcePage'] ?? 'SlabWay website form');



if ($fullName === '' || mb_strlen($fullName) < 2) {
    json_response(false, 'Please enter your full name.', 422);
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, 'Please enter a valid email address.', 422);
}

if ($phone === '' || mb_strlen($phone) < 6) {
    json_response(false, 'Please enter a valid phone number.', 422);
}

if ($service === '') {
    json_response(false, 'Please choose a concrete service category.', 422);
}

if ($message === '' || mb_strlen($message) < 10) {
    json_response(false, 'Please add a few project details.', 422);
}



$website = clean_input($_POST['website'] ?? '');

if ($website !== '') {
    json_response(true, 'Thank you. Your concrete request was received.');
}



$subject = "New Concrete Request From {$siteName}";

$emailBody = <<<EMAIL
New concrete request submitted through {$siteName}.

Name:
{$fullName}

Email:
{$email}

Phone:
{$phone}

Selected service:
{$service}

Project details:
{$message}

Source page:
{$sourcePage}

Important platform note:
SlabWay is an independent provider-matching platform. SlabWay does not directly pour, install, repair, inspect, guarantee, or perform concrete work.
EMAIL;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: SlabWay Website <no-reply@slabway.com>',
    'Reply-To: ' . $fullName . ' <' . $email . '>'
];



$mailSent = @mail(
    $recipientEmail,
    $subject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    json_response(
        false,
        'The form was validated, but the email could not be sent. Please check server mail settings or contact SlabWay directly by email.',
        500
    );
}

json_response(
    true,
    'Thank you. Your concrete request details were sent successfully.'
);
