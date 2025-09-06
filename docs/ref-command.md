
### **프로젝트 준비: 시작부터 설치까지**

#### **1. 프로젝트 초기화**

`package.json` 파일을 빠르게 생성하여 프로젝트를 초기화합니다.

```bash
npm init -y
```

#### **2. 의존성 설치**

프로젝트 실행에 필요한 모든 라이브러리를 한 번에 설치합니다.

```bash
npm install express dotenv bcrypt jsonwebtoken passport passport-jwt passport-local @prisma/client
```

  * **`express`**: 웹 서버 프레임워크
  * **`dotenv`**: 환경 변수 관리
  * **`bcrypt`**: 비밀번호 암호화
  * **`jsonwebtoken`**: JWT 생성 및 관리
  * **`passport`**: 인증 미들웨어
  * **`passport-jwt`**: JWT 인증 전략
  * **`passport-local`**: 아이디/비밀번호 인증 전략
  * **`@prisma/client`**: Prisma 클라이언트

#### **3. 개발 도구 설치**

개발 중 코드 변경 시 서버를 자동 재시작해주는 `nodemon`과 Prisma CLI를 설치합니다.

```bash
npm install --save-dev nodemon prisma
```

-----

### **데이터베이스 설정: Prisma 초기화 및 마이그레이션**

#### **1. Prisma 초기화**

`prisma` 폴더와 `schema.prisma` 파일을 생성합니다. 이 파일에 데이터베이스 모델을 정의하게 됩니다.

```bash
npx prisma init
```

#### **2. 데이터베이스 마이그레이션**

`schema.prisma`에 정의한 모델을 기반으로 실제 데이터베이스에 테이블을 생성합니다.

```bash
npx prisma migrate dev --name init
```

-----

### **프로젝트 실행**

#### **1. 개발 서버 실행**

코드를 수정하면 자동으로 서버가 재시작됩니다.

```bash
npm run dev
```

---

### **데이터베이스 설정**

이 프로젝트는 별도의 데이터베이스 설치 과정 없이 **SQLite**를 사용합니다. 데이터베이스 파일은 `prisma/migrations/dev.db` 경로에 자동으로 생성됩니다.

### **데이터베이스 확인 방법**

`dev.db` 파일의 내용을 확인하려면 **VS Code**에 **** **`SQLite Viewer` 확장팩**을 설치해야 합니다.

설치 후 `dev.db` 파일을 클릭하면 데이터베이스의 테이블과 데이터를 쉽게 확인할 수 있습니다.