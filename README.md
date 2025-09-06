# Express 유저 기능 구현 (연습2)

## 문제: Passport & JWT 기반 사용자 인증 시스템 구축

JWT를 사용해서 토큰 기반으로 인증 기능을 구현하고 테스트 해보세요.

### 구현할 기능

- **공통**
    - Prisma를 이용해서 데이터베이스와 상호작용 하세요.
    - 어떤 모델이 필요할지 생각해서 구성해보세요.
- **회원가입 (`/register`):**
    - `POST` 요청으로 `username`과 `password`를 받습니다.
    - `password`는 보안을 위해 `bcrypt`를 사용하여 해시 처리해야 합니다.
    - 회원가입 성공 시 `{ message: 'User registered successfully' }` JSON 응답을 반환합니다.
- **로그인 (`/login`):**
    - `POST` 요청으로 `username`과 `password`를 받습니다.
    - `passport-local` 전략을 사용하여 사용자를 인증합니다.
    - 인증 성공 시 `jsonwebtoken`을 사용하여 유효기간이 1시간인 JWT(JSON Web Token)를 생성하고, `{ token: '생성된 JWT' }` 형식으로 응답합니다.
    - 인증 실패 시 `401 Unauthorized` 상태 코드와 함께 에러 메시지를 반환합니다.
- **보호된 라우트 (`/profile`):**
    - `GET` 요청으로 접근하며, 요청 헤더에 유효한 JWT가 있어야만 접근 가능합니다.
    - `passport-jwt` 전략을 사용하여 JWT의 유효성을 검증합니다.
    - 토큰이 유효하면 `{ message: 'Protected profile data for ${user.username}' }` JSON 응답을 반환합니다.
    - 토큰이 없거나 유효하지 않으면 `401 Unauthorized` 에러를 반환합니다.


---
## 테스트

### 회원 가입 테스트

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}' \
  http://localhost:3000/register
```

**출력:**

```json
{"message":"User registered successfully"}
```

-----

### 로그인 테스트

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}' \
  http://localhost:3000/login
```

**출력:**

```json
{ "token": "..." }
```

**`...` 부분에는 발급된 JWT 토큰이 표시됩니다.**

-----

## 보호된 라우트 접근 테스트

### 접근 성공 테스트

`{ "token": "..." }`으로 받은 **JWT 토큰**을 `YOUR_JWT_TOKEN_HERE` 부분에 넣고 실행합니다.

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  http://localhost:3000/profile
```

**출력:**

```json
{"message":"Protected profile data for testuser"}
```

### 접근 실패 테스트

토큰 없이 요청을 보내면 `401 Unauthorized` 오류가 반환됩니다.

```bash
curl -X GET http://localhost:3000/profile
```

**출력:**

```
401 Unauthorized
```

---

### **데이터베이스 설정**

이 프로젝트는 별도의 데이터베이스 설치 과정 없이 **SQLite**를 사용합니다. 데이터베이스 파일은 `prisma/migrations/dev.db` 경로에 자동으로 생성됩니다.

### **데이터베이스 확인 방법**

`dev.db` 파일의 내용을 확인하려면 **VS Code**에 **** **`SQLite Viewer` 확장팩**을 설치해야 합니다.

설치 후 `dev.db` 파일을 클릭하면 데이터베이스의 테이블과 데이터를 쉽게 확인할 수 있습니다.

시작을 어떻게 해야할지 모르겠다. `docs 폴더` 안의 파일 참조