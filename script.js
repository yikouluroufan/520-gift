// ========== 🟡 请在这里填入你的题目 ==========
const questions = [
  {
    question: "在卤肉饭的世界里你是谁？",
    options: [
      { label: "A", text: "兄弟",     score: -1, feedback: "这个回答真的好吗？" },
      { label: "B", text: "姐妹",     score: 1,  feedback: "可以，至少是同一阵营。" },
      { label: "C", text: "朋友",     score: 2,  feedback: "稳妥的定位哟" },
      { label: "D", text: "学长",     score: 3,  feedback: "哇哦～学长这个称呼有点特殊哦。" },
      { label: "E", text: "以上都不是", score: 0, feedback: "好吧，那你心里一定有别的答案，下次偷偷告诉我。" }
    ]
  },
  {
    question: "卤肉饭如果打瓦生气了会怎么做？",
    options: [
      { label: "A", text: "直说",     score: 1, feedback: "嗯，这确实是我能干出来的事。" },
      { label: "B", text: "生闷气",   score: 1, feedback: "猜对了，偶尔会这样，不过得看对方是谁。" },
      { label: "C", text: "开骂",     score: 1, feedback: "哈哈，你是不是已经见识过我的输出能力了？" },
      { label: "D", text: "以上都会做", score: 2, feedback: "你好像很懂我，我生气时的多样性都被你发现了。" }
    ]
  },
  {
    question: "如果卤肉饭每天都找一个人聊天，那她啥意思？",
    options: [
      { label: "A", text: "单纯无聊想找人聊天", score: -1, feedback: "呃，我在你心里这么闲吗？有点小伤心。" },
      { label: "B", text: "朋友每天聊天不是很正常吗", score: 1, feedback: "也对啦，但也不是和每个朋友都这样哦。" },
      { label: "C", text: "诶？她是不是有点歪心思", score: 2, feedback: "糟糕，被你嗅到了一丝不寻常的味道。" },
      { label: "D", text: "和AI聊天也算人吗？", score: 0, feedback: "笑死，你是不是在套我的话。AI是AI，你是你。" }
    ]
  },
  {
    question: "你觉得卤肉饭最喜欢的城市是？",
    options: [
      { label: "A", text: "南昌", score: 1, feedback: "毕竟是上了三年学的地方" },
      { label: "B", text: "长沙", score: 1, feedback: "茶颜悦色确实很好喝呀。" },
      { label: "C", text: "上海", score: 1, feedback: "夜上海~夜上海~" },
      { label: "D", text: "平潭", score: 1, feedback: "还想再去一次！" },
      { label: "E", text: "以上都可以", score: 2, feedback: "聪明，我就是这么贪心，每个地方都有喜欢的理由。" }
    ]
  },
  {
    question: "猜一猜卤肉饭最近的一条搜索记录是？",
    options: [
      { label: "A", text: "INFP和INFJ的区别", score: 1, feedback: "没错，我确实会搜索这些，研究一下。" },
      { label: "B", text: "无畏契约怎么提升枪法", score: 1, feedback: "看来你知道我又菜又爱玩。" },
      { label: "C", text: "植物大战僵尸无尽阵型", score: 1, feedback: "最近认真深耕的领域。" },
      { label: "D", text: "怎么用AI制作一个网页", score: 1, feedback: "被你发现了……这个网页就是这么来的。" },
      { label: "E", text: "猜对没奖", score: 2, feedback: "选这个说明你已经完全掌握我的套路了。确实没奖，因为这个网页已经是奖品了。" }
    ]
  },
  {
    question: "卤肉饭去KTV最喜欢唱谁的歌？",
    options: [
      { label: "A", text: "孙燕姿", score: 1, feedback: "《我怀念的》一响，话筒就归我了。" },
      { label: "B", text: "梁静茹", score: 1, feedback: "情歌天后，谁还没有在KTV唱过呢。" },
      { label: "C", text: "林忆莲", score: 1, feedback: "开口就是成熟女人，虽然我未必唱得上去。" },
      { label: "D", text: "都喜欢", score: 2, feedback: "对，小孩子才做选择，成年人的KTV是全都要。" }
    ]
  }
];

// ========== 以下代码无需修改 ==========
let currentQuestion = 0;
let totalScore = 0;
const totalQuestions = questions.length;

// 页面元素
const welcomePage = document.getElementById('welcome-page');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const startBtn = document.getElementById('start-btn');
const progressDots = document.getElementById('progress-dots');
const progressText = document.getElementById('progress-text');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackArea = document.getElementById('feedback-area');
const scoreNumber = document.getElementById('score-number');
const levelName = document.getElementById('level-name');
const levelDesc = document.getElementById('level-desc');
const rewardText = document.getElementById('reward-text');

// 生成进度圆点
function createProgressDots() {
  progressDots.innerHTML = '';
  for (let i = 0; i < totalQuestions; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('filled');
    progressDots.appendChild(dot);
  }
  progressText.textContent = `1/${totalQuestions}`;
}

// 加载题目
function loadQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = '';
  feedbackArea.textContent = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `${opt.label}. ${opt.text}`;
    btn.addEventListener('click', () => selectAnswer(index, idx, btn));
    optionsContainer.appendChild(btn);
  });

  // 更新进度圆点
  const dots = document.querySelectorAll('.progress-dots .dot');
  dots.forEach((dot, i) => {
    if (i < index) dot.classList.add('filled');
    else if (i === index) dot.classList.add('filled');
    else dot.classList.remove('filled');
  });
  progressText.textContent = `${index+1}/${totalQuestions}`;
}

// 选择答案
function selectAnswer(questionIndex, optionIndex, selectedBtn) {
  // 禁用所有按钮
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.classList.add('disabled'));

  // 高亮选中
  selectedBtn.classList.add('selected');

  const chosen = questions[questionIndex].options[optionIndex];
  totalScore += chosen.score;

  // 显示反馈
  feedbackArea.textContent = chosen.feedback;
  feedbackArea.style.opacity = '0';
  setTimeout(() => { feedbackArea.style.opacity = '1'; }, 50);

  // 延迟后加载下一题或结果
  setTimeout(() => {
    if (questionIndex < totalQuestions - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
    } else {
      showResult();
    }
  }, 1500);
}

// 显示结果
function showResult() {
  quizPage.classList.remove('active');
  resultPage.classList.add('active');

  // 分数滚动动画
  let currentDisplay = 0;
  const targetScore = totalScore;
  const interval = setInterval(() => {
    currentDisplay += 1;
    scoreNumber.textContent = currentDisplay;
    if (currentDisplay >= targetScore) {
      clearInterval(interval);
      scoreNumber.textContent = targetScore;
      showLevel(targetScore);
    }
  }, 50);

  // 根据分数显示等级（之前我们设计的区间）
  function showLevel(score) {
    let name = '', desc = '', reward = '';
    if (score <= 4) {
      name = '观察者';
      desc = '我们好像还不太熟，不过没关系，这说明未来还有无限惊喜。谢谢你愿意点进来。';
      reward = '获得【三连问特权】，可以向我任意提问三个问题，我如实回答。';
    } else if (score <= 8) {
      name = '好朋友';
      desc = '你已经是卤肉饭认证的好朋友了，知道我的不少事嘛。';
      reward = '获得【奶茶/咖啡兑换券】一张，由本人亲自下单。';
    } else if (score <= 11) {
      name = '特别的存在';
      desc = '很危险，你有可能已经走进我心里了。';
      reward = '获得【专属歌曲券】一次，我录一首歌发你。';
    } else {
      name = '满格了解';
      desc = '你居然这么懂我？把这个网页发给你的决定真的没错。';
      reward = '获得【心愿券】一张，可以向我许一个愿，不违法不违背道德我都答应。';
    }
    levelName.textContent = name;
    levelDesc.textContent = desc;
    rewardText.textContent = reward;
  }
}

// 欢迎页开始按钮
startBtn.addEventListener('click', () => {
  welcomePage.classList.remove('active');
  quizPage.classList.add('active');
  createProgressDots();
  loadQuestion(0);
});

// 初始显示欢迎页
welcomePage.classList.add('active');