# VibeCatch 페이지 구성

이 프로젝트는 완성형 HTML 3페이지로 구성됩니다.

- `intro.html` : VibeCatch 소개 랜딩 페이지
- `pricing.html` : 기능/요금 상세 페이지
- `business-case.html` : 사업화 추진안 페이지

## 사용 방법

- 브라우저에서 `intro.html`을 열어 시작합니다.
- 로컬 서버 실행 시 `http://localhost:5500/intro.html`로 확인합니다.

## 콘텐츠 관리 기준

- 콘텐츠 단일 기준 문서: `content-baseline.md`
- 검토용 문서: `intro.md`, `pricing.md`, `business-case.md`
- 반영 원칙:
  1. 먼저 MD를 수정합니다.
  2. 기준표(`content-baseline.md`)와 충돌이 없는지 확인합니다.
  3. 필요한 HTML만 최소 수정합니다.

## 현재 기준값(요약)

- Pro 기준: `490만 원/월`, `키워드 50`, `좌석 10`
- 대응 메시지 초안: Pro는 `AI 초안(옵션)`, Enterprise는 `맞춤 템플릿`
- 과금 설명 키워드: `키워드/좌석/수집주기/AI/Backfill` (+ 옵션으로 Export/연동 범위)

## 최근 반영 내용

- 3페이지 글로벌/로컬 네비게이션 구조 정리
- 브랜드 명칭 `VibeCatch`로 통일
- `business-case.html` 경쟁사/로드맵/KPI 내용 보강
- `content-baseline.md` 기준으로 HTML 정합성 재동기화

## 다음 작업 체크리스트

1. 문구 변경 시 `content-baseline.md` 충돌 여부 먼저 확인
2. `intro.md` ↔ `pricing.md` ↔ `business-case.md` 메시지 일관성 점검
3. 최종적으로 HTML 링크/앵커 동작 확인




