def test_register(client):
    response = client.post('/api/register', json={
        "email": "test.user@gmail.com",
        "firName": "Test",
        "lstName": "User",
        "userPsw": "pass",
        "address": "1 Washington Sq, San Jose, CA 95192"})
    assert response.json["msg"] == "User registered successfully"
    assert response.status_code == 200

def test_register_duplicate(client):
    response = client.post('/api/register', json={
        "email": "test.user@gmail.com",
        "firName": "Test",
        "lstName": "User",
        "userPsw": "pass",
        "address": "1 Washington Sq, San Jose, CA 95192"})
    assert response.json["msg"] == "User already exists"
    assert response.status_code == 400

def test_login(client):
    response = client.post('/api/login', json={
        "email": "test.user@gmail.com",
        "userPsw": "pass"})
    assert response.status_code == 200
   