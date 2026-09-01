// 게임 전반에서 쓰는 효과음 재생 유틸리티
const SOUND_SOURCES = {
  click: "assets/sounds/freesound_gamestudio-button-394464.mp3", // 버튼 탭
  open: "assets/sounds/universfield-game-bonus-03-487857.mp3", // 이벤트 화면(돋보기) 열림
  notebook: "assets/sounds/floraphonic-90s-game-ui-1-185094.mp3", // 단서가 수첩에 추가됨
  success: "assets/sounds/floraphonic-90s-game-ui-7-185100.mp3", // 점수 획득
  walk: "assets/sounds/freesound_community-footsteps-running-away-fading-2-103763.mp3", // 방 이동
  type: "assets/sounds/dragon-studio-keyboard-typing-effect-free-393912.mp3", // 화면이 흐려지며 문구가 타이핑되는 인트로
  spray: "assets/sounds/magiaz-fire_extinguisher-481270.mp3", // 소화기 분사
  warning: "assets/sounds/wefgf-warning-423632.mp3", // 범인의 흔적 / 사건 설명 경고음
};

function playSound(name, volume = 0.5) {
  const src = SOUND_SOURCES[name];
  if (!src) return;
  // 매번 새 Audio 인스턴스를 만들어 같은 효과음이 겹쳐 재생돼도 서로 끊기지 않게 함
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {}); // 사용자 상호작용 이전 자동재생 차단 등은 조용히 무시
}

// 버튼 종류를 일일이 찾아다니지 않도록, 모든 <button> 클릭에 공통으로 가벼운 탭 효과음을 입힘
// (단, 방(배경) 이동 버튼은 발소리만, 범인의 흔적 오브젝트는 경고음만 나오도록 이 공통 클릭음에서는 제외함)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.id === "room-arrow-left" || btn.id === "room-arrow-right") return;
  if (window.suppressClickSound) {
    window.suppressClickSound = false;
    return;
  }
  playSound("click", 0.25);
});

// 배경음악: 효과음과 달리 하나의 Audio 인스턴스를 계속 재사용해 반복 재생
const bgmAudio = new Audio("assets/sounds/freesound_community-008466_sodiac-49363.mp3");
bgmAudio.loop = true;
bgmAudio.volume = 0.3;

function playBackgroundMusic() {
  bgmAudio.currentTime = 0;
  bgmAudio.play().catch(() => {});
}

function stopBackgroundMusic() {
  bgmAudio.pause();
  bgmAudio.currentTime = 0;
}

// 사건 설명(컷신) 화면에서 반복 재생되는 경고음: 배경음악과 마찬가지로 인스턴스 하나를 재사용
const warningLoopAudio = new Audio(SOUND_SOURCES.warning);
warningLoopAudio.loop = true;
warningLoopAudio.volume = 0.35;

function playWarningLoop() {
  warningLoopAudio.currentTime = 0;
  warningLoopAudio.play().catch(() => {});
}

function stopWarningLoop() {
  warningLoopAudio.pause();
  warningLoopAudio.currentTime = 0;
}
