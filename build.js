#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 빌드할 페이지 목록 (루트 디렉토리의 폴더 자동 탐지)
function getPageList() {
  const rootDir = __dirname;
  return fs.readdirSync(rootDir)
    .filter(file => {
      const filePath = path.join(rootDir, file);
      return fs.statSync(filePath).isDirectory() &&
             !file.startsWith('.') &&
             fs.existsSync(path.join(filePath, 'parts'));
    });
}

// 특정 페이지를 빌드하는 함수
function buildPage(pageName) {
  const pageDir = path.join(__dirname, pageName);
  const partsDir = path.join(pageDir, 'parts');
  const outputFile = path.join(pageDir, 'index.html');

  // parts/ 디렉토리 확인
  if (!fs.existsSync(partsDir)) {
    console.error(`❌ ${pageName}/parts/ 디렉토리를 찾을 수 없습니다.`);
    process.exit(1);
  }

  // HTML 조각 파일 읽기 (순서대로 정렬)
  const files = fs.readdirSync(partsDir)
    .filter(file => file.endsWith('.html'))
    .sort();

  if (files.length === 0) {
    console.error(`❌ ${pageName}/parts/ 디렉토리에 HTML 파일이 없습니다.`);
    process.exit(1);
  }

  // HTML 조합
  let htmlContent = '<!doctype html>\n<html lang="ko">\n';

  files.forEach(file => {
    const filePath = path.join(partsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    htmlContent += content;
  });

  htmlContent += '</html>\n';

  // index.html 파일로 저장
  fs.writeFileSync(outputFile, htmlContent, 'utf8');

  // 통계 출력
  const stats = fs.statSync(outputFile);
  const lines = htmlContent.split('\n').length;
  const sizeKB = (stats.size / 1024).toFixed(1);

  console.log(`✓ ${pageName} 빌드 완료!`);
  console.log(`  파일: ${files.length}개 → index.html`);
  console.log(`  라인: ${lines}줄`);
  console.log(`  크기: ${sizeKB} KB`);
}

// 루트 index.html 자동 생성 함수
function generateRootIndex(pages) {
  const projectsArray = pages.map(pageName => {
    const readmePath = path.join(__dirname, pageName, 'README.md');
    let desc = '프로젝트';

    // README.md가 있으면 첫 줄 추출
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      const firstLine = readmeContent.split('\n')[2] || '프로젝트';
      desc = firstLine.replace(/^#+\s+/, '').trim();
    }

    return `            { name: '${pageName.charAt(0).toUpperCase() + pageName.slice(1)}', path: '${pageName}', desc: '${desc}' },`;
  }).join('\n');

  const indexHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>소셜리스닝 - 프로젝트 목록</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    </style>
</head>
<body>
    <div class="max-w-2xl mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <h1 class="text-4xl font-bold text-center mb-2 text-slate-900">소셜리스닝 프로젝트</h1>
            <p class="text-center text-slate-600 mb-8">독립적인 웹 페이지들 (${pages.length}개)</p>

            <div class="space-y-4" id="projectList">
                <!-- 프로젝트 목록이 JavaScript로 동적으로 생성됨 -->
            </div>

            <div class="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p class="text-sm text-slate-700">
                    <strong>💡 팁:</strong> 이 페이지는 자동으로 생성됩니다.
                    새 프로젝트 폴더를 추가하고 <code class="bg-white px-2 py-1 rounded">npm run build</code>를 실행하면 목록이 자동으로 업데이트됩니다.
                </p>
            </div>
        </div>
    </div>

    <script>
        // 이 배열은 build.js에서 자동으로 생성됩니다
        const projects = [
${projectsArray}
        ];

        const projectList = document.getElementById('projectList');

        if (projects.length === 0) {
            projectList.innerHTML = '<p class="text-slate-500 text-center py-8">프로젝트를 찾을 수 없습니다.</p>';
        } else {
            projects.forEach(project => {
                const card = document.createElement('a');
                card.href = \`./\${project.path}/\`;
                card.className = 'block p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group';
                card.innerHTML = \`
                    <div class="flex items-start justify-between mb-2">
                        <h2 class="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">\${project.name}</h2>
                        <span class="text-2xl">→</span>
                    </div>
                    <p class="text-slate-600">\${project.desc}</p>
                \`;
                projectList.appendChild(card);
            });
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');
  console.log('✓ 루트 index.html 자동 생성됨');
}

// 메인 로직
const targetPage = process.argv[2];

if (targetPage) {
  // 특정 페이지만 빌드
  console.log(`\n🔨 ${targetPage} 빌드 시작...\n`);
  buildPage(targetPage);

  // 루트 index.html 업데이트
  const pages = getPageList();
  generateRootIndex(pages);
  console.log('');
} else {
  // 모든 페이지 빌드
  const pages = getPageList();
  if (pages.length === 0) {
    console.error('❌ 빌드할 페이지가 없습니다. parts/ 폴더를 포함한 페이지 폴더를 생성해주세요.');
    process.exit(1);
  }

  console.log(`\n🔨 전체 빌드 시작... (${pages.length}개 페이지)\n`);
  pages.forEach(page => {
    buildPage(page);
    console.log('');
  });

  // 루트 index.html 업데이트
  generateRootIndex(pages);
  console.log('');
  console.log('✅ 전체 빌드 완료!');
}
