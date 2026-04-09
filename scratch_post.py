import requests

url = "https://shadow-sop.onrender.com/api/v1/distill"
headers = {
    "Origin": "https://shadowsop-8k3i.onrender.com",
    "x-api-key": "dev-test-key-123"
}
data = {
    "source_text": "testing 123",
    "context_hints": ""
}

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {response.headers}")
    print(f"Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")
