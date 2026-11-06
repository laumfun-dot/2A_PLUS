import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileSpreadsheet, 
  Megaphone, 
  HelpCircle, 
  Vote, 
  ShieldAlert, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Circle, 
  User, 
  Key, 
  AlertCircle, 
  Calendar, 
  Clock, 
  Check, 
  X,
  MessageSquare,
  ThumbsUp,
  Tag
} from 'lucide-react';

// --- INITIAL USER ACCOUNTS (2A01 - 2A35) ---
const INITIAL_USERS = [
  { username: '2A01', password: '2A01', permission: 1 },
  { username: '2A02', password: '2A02', permission: 1 },
  { username: '2A03', password: '2A03', permission: 1 },
  { username: '2A04', password: '2A04', permission: 1 },
  { username: '2A05', password: '2A05', permission: 3 }, // LV.3 Boss
  { username: '2A06', password: '2A06', permission: 1 },
  { username: '2A07', password: '2A07', permission: 1 },
  { username: '2A08', password: '2A08', permission: 1 },
  { username: '2A09', password: '2A09', permission: 1 },
  { username: '2A10', password: '2A10', permission: 1 },
  { username: '2A11', password: '2A11', permission: 1 },
  { username: '2A12', password: '2A12', permission: 1 },
  { username: '2A13', password: '2A13', permission: 1 },
  { username: '2A14', password: '2A14', permission: 1 },
  { username: '2A15', password: '2A15', permission: 1 },
  { username: '2A16', password: '2A16', permission: 1 },
  { username: '2A17', password: '2A17', permission: 2 }, // LV.2 Admin
  { username: '2A18', password: '2A18', permission: 1 },
  { username: '2A19', password: '2A19', permission: 1 },
  { username: '2A20', password: '2A20', permission: 1 },
  { username: '2A21', password: '2A21', permission: 1 },
  { username: '2A22', password: '2A22', permission: 1 },
  { username: '2A23', password: '2A23', permission: 1 },
  { username: '2A24', password: '2A24', permission: 1 },
  { username: '2A25', password: '2A25', permission: 1 },
  { username: '2A26', password: '2A26', permission: 1 },
  { username: '2A27', password: '2A27', permission: 1 },
  { username: '2A28', password: '2A28', permission: 2 }, // LV.2 Admin
  { username: '2A29', password: '2A29', permission: 1 },
  { username: '2A30', password: '2A30', permission: 1 },
  { username: '2A31', password: '2A31', permission: 1 },
  { username: '2A32', password: '2A32', permission: 1 },
  { username: '2A33', password: '2A33', permission: 1 },
  { username: '2A34', password: '2A34', permission: 1 },
  { username: '2A35', password: '2A35', permission: 1 },
];

export default function App() {
  // Session & User State
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('2aplus_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('2aplus_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab State
  const [activeTab, setActiveTab] = useState('homework');

  // --- DATA STATES ---
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      subject: '數學科',
      teacher: '陳老師',
      content: '完成工作紙 Ch.4 習題',
      page: 'P.12 - P.14',
      remark: '下星期一交，逾期扣分',
      startDate: '2026-11-02',
      endDate: '2026-11-09',
      completedUsers: ['2A01', '2A05']
    },
    {
      id: 2,
      subject: '中文科',
      teacher: '李老師',
      content: '單元二 閱讀理解練習',
      page: 'P.45 - P.48',
      remark: '請準備預習課文',
      startDate: '2026-11-05',
      endDate: '2026-11-10',
      completedUsers: []
    }
  ]);

  const [examList, setExamList] = useState([
    {
      id: 1,
      type: 'Quiz',
      subject: '英文科',
      content: 'Unit 3 Vocabulary & Grammar (Present Perfect)',
      remark: '包含默書',
      date: '2026-11-12'
    },
    {
      id: 2,
      type: 'Examination',
      subject: '科學科',
      content: 'Ch.1 - Ch.3 綜合測試',
      remark: '帶計算機及畫圖工具',
      date: '2026-11-20'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: '班會旅行地點收集意見',
      content: '請所有同學於本週五前在投票區完成「秋季班會旅行地點」投票。',
      author: '2A05 (Boss)',
      date: '2026-11-01',
      urgent: true
    }
  ]);

  const [qaList, setQaList] = useState([
    {
      id: 1,
      author: '2A02',
      title: '數學 P.14 第 8 題點樣做？',
      content: '關於二次方程求解，試咗公式法算唔出整數，有冇人可以教下？',
      subject: '數學',
      resolved: false,
      answers: [
        {
          id: 101,
          author: '2A17',
          content: '呢題要先將右邊移項變做 ax^2 + bx + c = 0 形式，然後因式分解就拆到。'
        }
      ]
    }
  ]);

  const [votes, setVotes] = useState([
    {
      id: 1,
      title: '2026 秋季班郊遊地點選擇',
      isMultiple: false,
      isAnonymous: true,
      options: [
        { id: 1, text: '西貢海濱公園 (燒烤)', votes: ['2A01', '2A02', '2A05'] },
        { id: 2, text: '迪士尼樂園', votes: ['2A06', '2A17'] },
        { id: 3, text: '海洋公園', votes: ['2A28'] }
      ]
    }
  ]);

  // Editing state placeholders
  const [editingHwId, setEditingHwId] = useState(null);
  const [editingExamId, setEditingExamId] = useState(null);
  const [editingAnnId, setEditingAnnId] = useState(null);
  const [editingVoteId, setEditingVoteId] = useState(null);

  // Sync users to LocalStorage
  useEffect(() => {
    localStorage.setItem('2aplus_users', JSON.stringify(users));
  }, [users]);

  // Sync current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('2aplus_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('2aplus_current_user');
    }
  }, [currentUser]);

  // --- AUTH HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    const found = users.find(
      (u) => u.username.toUpperCase() === loginUsername.trim().toUpperCase() && u.password === loginPassword
    );

    if (found) {
      setCurrentUser(found);
      setLoginError('');
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('用戶名稱或密碼錯誤！');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // --- LV.3 USER MANAGEMENT HANDLERS ---
  const [selectedUser, setSelectedUser] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPermLevel, setNewPermLevel] = useState(1);
  const [adminMsg, setAdminMsg] = useState('');

  const handleUpdateUserData = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.username === selectedUser) {
          return {
            ...u,
            password: newPassword ? newPassword : u.password,
            permission: Number(newPermLevel)
          };
        }
        return u;
      })
    );

    if (currentUser && currentUser.username === selectedUser) {
      setCurrentUser((prev) => ({
        ...prev,
        password: newPassword ? newPassword : prev.password,
        permission: Number(newPermLevel)
      }));
    }

    setAdminMsg(`成功更新 ${selectedUser} 的帳號資料與權限！`);
    setTimeout(() => setAdminMsg(''), 3000);
    setNewPassword('');
  };

  // --- HOMEWORK HANDLERS ---
  const [hwSubject, setHwSubject] = useState('');
  const [hwTeacher, setHwTeacher] = useState('');
  const [hwContent, setHwContent] = useState('');
  const [hwPage, setHwPage] = useState('');
  const [hwRemark, setHwRemark] = useState('');
  const [hwStart, setHwStart] = useState('');
  const [hwEnd, setHwEnd] = useState('');

  const handleSaveHomework = (e) => {
    e.preventDefault();
    if (editingHwId) {
      setHomeworkList((prev) =>
        prev.map((hw) =>
          hw.id === editingHwId
            ? { ...hw, subject: hwSubject, teacher: hwTeacher, content: hwContent, page: hwPage, remark: hwRemark, startDate: hwStart, endDate: hwEnd }
            : hw
        )
      );
      setEditingHwId(null);
    } else {
      const newItem = {
        id: Date.now(),
        subject: hwSubject,
        teacher: hwTeacher,
        content: hwContent,
        page: hwPage,
        remark: hwRemark,
        startDate: hwStart,
        endDate: hwEnd,
        completedUsers: []
      };
      setHomeworkList([newItem, ...homeworkList]);
    }
    setHwSubject(''); setHwTeacher(''); setHwContent(''); setHwPage(''); setHwRemark(''); setHwStart(''); setHwEnd('');
  };

  const startEditHomework = (hw) => {
    setEditingHwId(hw.id);
    setHwSubject(hw.subject);
    setHwTeacher(hw.teacher);
    setHwContent(hw.content);
    setHwPage(hw.page || '');
    setHwRemark(hw.remark || '');
    setHwStart(hw.startDate);
    setHwEnd(hw.endDate);
  };

  const toggleHomeworkComplete = (id) => {
    if (!currentUser) return;
    setHomeworkList((prev) =>
      prev.map((hw) => {
        if (hw.id === id) {
          const hasDone = hw.completedUsers.includes(currentUser.username);
          const updatedUsers = hasDone
            ? hw.completedUsers.filter((u) => u !== currentUser.username)
            : [...hw.completedUsers, currentUser.username];
          return { ...hw, completedUsers: updatedUsers };
        }
        return hw;
      })
    );
  };

  const deleteHomework = (id) => {
    setHomeworkList(homeworkList.filter((h) => h.id !== id));
  };

  // --- EXAM HANDLERS ---
  const [exType, setExType] = useState('Quiz');
  const [exSubject, setExSubject] = useState('');
  const [exContent, setExContent] = useState('');
  const [exRemark, setExRemark] = useState('');
  const [exDate, setExDate] = useState('');

  const handleSaveExam = (e) => {
    e.preventDefault();
    if (editingExamId) {
      setExamList((prev) =>
        prev.map((ex) =>
          ex.id === editingExamId
            ? { ...ex, type: exType, subject: exSubject, content: exContent, remark: exRemark, date: exDate }
            : ex
        )
      );
      setEditingExamId(null);
    } else {
      const newItem = {
        id: Date.now(),
        type: exType,
        subject: exSubject,
        content: exContent,
        remark: exRemark,
        date: exDate
      };
      setExamList([newItem, ...examList]);
    }
    setExSubject(''); setExContent(''); setExRemark(''); setExDate('');
  };

  const startEditExam = (ex) => {
    setEditingExamId(ex.id);
    setExType(ex.type);
    setExSubject(ex.subject);
    setExContent(ex.content);
    setExRemark(ex.remark || '');
    setExDate(ex.date);
  };

  const deleteExam = (id) => {
    setExamList(examList.filter((e) => e.id !== id));
  };

  // --- ANNOUNCEMENT HANDLERS (LV.2/LV.3) ---
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annUrgent, setAnnUrgent] = useState(false);

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (editingAnnId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingAnnId
            ? { ...a, title: annTitle, content: annContent, urgent: annUrgent }
            : a
        )
      );
      setEditingAnnId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: annTitle,
        content: annContent,
        author: `${currentUser.username} (${currentUser.permission === 3 ? 'Boss' : 'Admin'})`,
        date: new Date().toISOString().split('T')[0],
        urgent: annUrgent
      };
      setAnnouncements([newItem, ...announcements]);
    }
    setAnnTitle(''); setAnnContent(''); setAnnUrgent(false);
  };

  const startEditAnnouncement = (ann) => {
    setEditingAnnId(ann.id);
    setAnnTitle(ann.title);
    setAnnContent(ann.content);
    setAnnUrgent(ann.urgent);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // --- QA HANDLERS ---
  const [qaSubject, setQaSubject] = useState('通用');
  const [qaTitle, setQaTitle] = useState('');
  const [qaContent, setQaContent] = useState('');

  const handleAddQa = (e) => {
    e.preventDefault();
    const newQa = {
      id: Date.now(),
      author: currentUser.username,
      subject: qaSubject,
      title: qaTitle,
      content: qaContent,
      resolved: false,
      answers: []
    };
    setQaList([newQa, ...qaList]);
    setQaTitle(''); setQaContent('');
  };

  const [ansTextMap, setAnsTextMap] = useState({});

  const handleAddAnswer = (qaId) => {
    const text = ansTextMap[qaId];
    if (!text || !text.trim()) return;

    setQaList((prev) =>
      prev.map((qa) => {
        if (qa.id === qaId) {
          return {
            ...qa,
            answers: [
              ...qa.answers,
              {
                id: Date.now(),
                author: currentUser.username,
                content: text
              }
            ]
          };
        }
        return qa;
      })
    );

    setAnsTextMap({ ...ansTextMap, [qaId]: '' });
  };

  const toggleQaResolved = (id) => {
    setQaList((prev) => prev.map((q) => (q.id === id ? { ...q, resolved: !q.resolved } : q)));
  };

  const deleteQaQuestion = (id) => {
    setQaList(qaList.filter((q) => q.id !== id));
  };

  const deleteQaAnswer = (qaId, ansId) => {
    setQaList((prev) =>
      prev.map((q) => (q.id === qaId ? { ...q, answers: q.answers.filter((a) => a.id !== ansId) } : q))
    );
  };

  // --- VOTING HANDLERS (LV.2/LV.3 Full Control) ---
  const [voteTitle, setVoteTitle] = useState('');
  const [voteOptions, setVoteOptions] = useState(['', '']);
  const [voteIsAnonymous, setVoteIsAnonymous] = useState(true);
  const [voteIsMultiple, setVoteIsMultiple] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...voteOptions];
    newOptions[index] = value;
    setVoteOptions(newOptions);
  };

  const addOptionField = () => {
    setVoteOptions([...voteOptions, '']);
  };

  const removeOptionField = (index) => {
    if (voteOptions.length <= 2) return;
    setVoteOptions(voteOptions.filter((_, i) => i !== index));
  };

  const handleSaveVote = (e) => {
    e.preventDefault();
    const validOptions = voteOptions.filter((opt) => opt.trim() !== '');
    if (validOptions.length < 2) return;

    if (editingVoteId) {
      setVotes((prev) =>
        prev.map((v) =>
          v.id === editingVoteId
            ? {
                ...v,
                title: voteTitle,
                isAnonymous: voteIsAnonymous,
                isMultiple: voteIsMultiple,
                options: validOptions.map((text, idx) => {
                  const existing = v.options.find((o) => o.text === text);
                  return { id: idx + 1, text, votes: existing ? existing.votes : [] };
                })
              }
            : v
        )
      );
      setEditingVoteId(null);
    } else {
      const newVote = {
        id: Date.now(),
        title: voteTitle,
        isAnonymous: voteIsAnonymous,
        isMultiple: voteIsMultiple,
        options: validOptions.map((text, idx) => ({ id: idx + 1, text, votes: [] }))
      };
      setVotes([newVote, ...votes]);
    }

    setVoteTitle(''); setVoteOptions(['', '']); setVoteIsAnonymous(true); setVoteIsMultiple(false);
  };

  const startEditVote = (v) => {
    setEditingVoteId(v.id);
    setVoteTitle(v.title);
    setVoteIsAnonymous(v.isAnonymous);
    setVoteIsMultiple(v.isMultiple);
    setVoteOptions(v.options.map((o) => o.text));
  };

  const deleteVote = (id) => {
    setVotes(votes.filter((v) => v.id !== id));
  };

  const handleCastVote = (voteId, optionId) => {
    if (!currentUser) return;
    setVotes((prev) =>
      prev.map((v) => {
        if (v.id === voteId) {
          const updatedOptions = v.options.map((opt) => {
            const hasVoted = opt.votes.includes(currentUser.username);
            if (opt.id === optionId) {
              return {
                ...opt,
                votes: hasVoted
                  ? opt.votes.filter((u) => u !== currentUser.username)
                  : [...opt.votes, currentUser.username]
              };
            } else if (!v.isMultiple) {
              return {
                ...opt,
                votes: opt.votes.filter((u) => u !== currentUser.username)
              };
            }
            return opt;
          });
          return { ...v, options: updatedOptions };
        }
        return v;
      })
    );
  };

  // --- RENDER LOGIN IF NOT AUTHENTICATED ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              2Aplus 內部平台
            </h1>
            <p className="text-slate-400 text-sm mt-2">中學 2A 班專屬學術與交流系統</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                學號 / 用戶名稱 (Username)
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="例如: 2A01 或 2A05"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                密碼 (Password)
              </label>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="輸入密碼"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              登入系統
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/50 text-xs text-slate-500 text-center space-y-1">
            <p>預設登入：2A01 – 2A35 (密碼同學號)</p>
            <p>LV.3 Boss 帳號：<span className="text-blue-400 font-mono">2A05</span> | LV.2 Admin: <span className="text-amber-400 font-mono">2A17, 2A28</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* --- TOP NAVBAR --- */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                2Aplus
              </span>
              <span className="ml-2 text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                內部平台
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">{currentUser.username}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                  currentUser.permission === 3
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : currentUser.permission === 2
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {currentUser.permission === 3 ? 'LV.3 BOSS' : currentUser.permission === 2 ? 'LV.2 ADMIN' : 'LV.1 USER'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-all"
              title="登出"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- NAVIGATION TABS --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {[
            { id: 'homework', label: '功課清單', icon: BookOpen },
            { id: 'exam', label: 'Quiz / Exam', icon: FileSpreadsheet },
            { id: 'announcement', label: '重要公告', icon: Megaphone },
            { id: 'qa', label: '互助區', icon: HelpCircle },
            { id: 'vote', label: '班會投票', icon: Vote },
            ...(currentUser.permission === 3
              ? [{ id: 'admin', label: '後台帳號管理', icon: ShieldAlert }]
              : [])
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                  active
                    ? 'border-blue-500 text-blue-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= TAB 1: HOMEWORK LIST ================= */}
        {activeTab === 'homework' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="text-blue-400" /> 班級功課清單
                </h2>
                <p className="text-slate-400 text-sm">查看科目的作業要求及截止日期</p>
              </div>
            </div>

            {/* Admin Add/Edit Homework Form */}
            {currentUser.permission >= 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  {editingHwId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingHwId ? '修改功課項目 (LV.2 / LV.3 管理員專屬)' : '新增功課項目 (LV.2 / LV.3 管理員專屬)'}
                </h3>
                <form onSubmit={handleSaveHomework} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="科目 (例如: 數學科)"
                    value={hwSubject}
                    onChange={(e) => setHwSubject(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="負責老師"
                    value={hwTeacher}
                    onChange={(e) => setHwTeacher(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="頁數 (如有)"
                    value={hwPage}
                    onChange={(e) => setHwPage(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="作業內容"
                    value={hwContent}
                    onChange={(e) => setHwContent(e.target.value)}
                    className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="備注"
                    value={hwRemark}
                    onChange={(e) => setHwRemark(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">開始日期</label>
                    <input
                      type="date"
                      required
                      value={hwStart}
                      onChange={(e) => setHwStart(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">結束/截止日期</label>
                    <input
                      type="date"
                      required
                      value={hwEnd}
                      onChange={(e) => setHwEnd(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
                    >
                      {editingHwId ? '更新功課' : '發布功課'}
                    </button>
                    {editingHwId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingHwId(null);
                          setHwSubject(''); setHwTeacher(''); setHwContent(''); setHwPage(''); setHwRemark(''); setHwStart(''); setHwEnd('');
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-sm"
                      >
                        取消
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Homework Cards */}
            <div className="grid grid-cols-1 gap-4">
              {homeworkList.map((hw) => {
                const isDone = hw.completedUsers.includes(currentUser.username);
                return (
                  <div
                    key={hw.id}
                    className={`bg-slate-900 border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                      isDone ? 'border-emerald-500/30 bg-slate-900/50' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleHomeworkComplete(hw.id)}
                        className={`mt-1 p-1 rounded-full transition-colors ${
                          isDone ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-lg text-slate-100">{hw.subject}</span>
                          <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-md">
                            老師: {hw.teacher}
                          </span>
                          {hw.page && (
                            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md">
                              {hw.page}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 mt-2 font-medium">{hw.content}</p>
                        {hw.remark && <p className="text-slate-500 text-xs mt-1">備註: {hw.remark}</p>}
                        <div className="flex items-center space-x-4 mt-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            {hw.startDate} 至 {hw.endDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {currentUser.permission >= 2 && (
                      <div className="flex items-center space-x-2 self-end md:self-center">
                        <button
                          onClick={() => startEditHomework(hw)}
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-xl transition-all"
                          title="修改"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteHomework(hw.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-all"
                          title="刪除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: EXAM LIST ================= */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileSpreadsheet className="text-amber-400" /> Quiz / Examination 清單
              </h2>
              <p className="text-slate-400 text-sm">測驗與考試日程安排及範圍</p>
            </div>

            {/* Admin Add/Edit Exam Form */}
            {currentUser.permission >= 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                  {editingExamId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingExamId ? '修改測驗/考試項目' : '新增測驗/考試 (LV.2 / LV.3 管理員專屬)'}
                </h3>
                <form onSubmit={handleSaveExam} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={exType}
                    onChange={(e) => setExType(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                  >
                    <option value="Quiz">Quiz (小測)</option>
                    <option value="Test">Test (測驗)</option>
                    <option value="Examination">Examination (期末考/統測)</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="科目"
                    value={exSubject}
                    onChange={(e) => setExSubject(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <input
                    type="date"
                    required
                    value={exDate}
                    onChange={(e) => setExDate(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                  />
                  <input
                    type="text"
                    required
                    placeholder="考核內容/範圍"
                    value={exContent}
                    onChange={(e) => setExContent(e.target.value)}
                    className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="備注 (如必帶文具)"
                    value={exRemark}
                    onChange={(e) => setExRemark(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <div className="md:col-span-3 flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-md shadow-amber-600/20"
                    >
                      {editingExamId ? '更新測驗項目' : '新增測驗項目'}
                    </button>
                    {editingExamId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExamId(null);
                          setExSubject(''); setExContent(''); setExRemark(''); setExDate('');
                        }}
                        className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-sm"
                      >
                        取消
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Exam List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {examList.map((ex) => (
                <div key={ex.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                          ex.type === 'Examination'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {ex.type}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {ex.date}
                      </span>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-xl font-bold text-slate-100">{ex.subject}</h3>
                      <p className="text-slate-300 text-sm mt-2">{ex.content}</p>
                      {ex.remark && <p className="text-slate-500 text-xs mt-1">備註: {ex.remark}</p>}
                    </div>
                  </div>
                  {currentUser.permission >= 2 && (
                    <div className="pt-2 border-t border-slate-800 flex justify-end gap-3">
                      <button
                        onClick={() => startEditExam(ex)}
                        className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> 修改
                      </button>
                      <button
                        onClick={() => deleteExam(ex.id)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> 刪除
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ANNOUNCEMENT ================= */}
        {activeTab === 'announcement' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Megaphone className="text-purple-400" /> Important Announcements (重要公告)
              </h2>
              <p className="text-slate-400 text-sm">全班最新通知與緊急事項</p>
            </div>

            {/* Admin Add/Edit Announcement Form */}
            {currentUser.permission >= 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                  {editingAnnId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingAnnId ? '修改公告 (LV.2 / LV.3 管理員專屬)' : '發布重要公告 (LV.2 / LV.3 管理員專屬)'}
                </h3>
                <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="公告標題"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="公告內容..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={annUrgent}
                        onChange={(e) => setAnnUrgent(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-purple-500"
                      />
                      <span>標記為「緊急置頂」</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-xl transition-all shadow-md shadow-purple-600/20"
                      >
                        {editingAnnId ? '更新公告' : '發布公告'}
                      </button>
                      {editingAnnId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAnnId(null);
                            setAnnTitle(''); setAnnContent(''); setAnnUrgent(false);
                          }}
                          className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm"
                        >
                          取消
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
                  {item.urgent && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl shadow-lg">
                      緊急置頂
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">{item.content}</p>
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span>發布者: {item.author} • {item.date}</span>
                    {currentUser.permission >= 2 && (
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => startEditAnnouncement(item)}
                          className="text-slate-400 hover:text-blue-400 flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" /> 修改
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(item.id)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> 刪除
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: Q&A ZONE ================= */}
        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <HelpCircle className="text-emerald-400" /> 課業互助區
              </h2>
              <p className="text-slate-400 text-sm">同學提出課業疑難 (如數理題)，其他同學或管理員可發帖回覆解答</p>
            </div>

            {/* Ask Question Form (All Users) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" /> 我要發問
              </h3>
              <form onSubmit={handleAddQa} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={qaSubject}
                    onChange={(e) => setQaSubject(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                  >
                    <option value="數學">數學科</option>
                    <option value="科學">科學科</option>
                    <option value="英文">英文科</option>
                    <option value="中文">中文科</option>
                    <option value="通用">其他科目</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="問題標題"
                    value={qaTitle}
                    onChange={(e) => setQaTitle(e.target.value)}
                    className="md:col-span-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="詳細描述你的疑問..."
                  value={qaContent}
                  onChange={(e) => setQaContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                >
                  提交問題
                </button>
              </form>
            </div>

            {/* Question Cards */}
            <div className="space-y-6">
              {qaList.map((qa) => (
                <div key={qa.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-md font-semibold">
                        {qa.subject}
                      </span>
                      {qa.resolved && (
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-2.5 py-1 rounded-md font-bold">
                          已解決
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-slate-100">{qa.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500">提問者: {qa.author}</span>
                      {currentUser.permission >= 2 && (
                        <>
                          <button
                            onClick={() => toggleQaResolved(qa.id)}
                            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg text-xs flex items-center gap-1"
                            title="標記已解決"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteQaQuestion(qa.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg text-xs"
                            title="刪除發問"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">{qa.content}</p>

                  {/* Answers Section */}
                  <div className="bg-slate-950/60 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">解答列表 ({qa.answers.length})</h4>
                    {qa.answers.map((ans) => (
                      <div key={ans.id} className="border-b border-slate-800/60 pb-2 last:border-none flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
                            <span className="font-semibold text-blue-400">{ans.author} 回覆:</span>
                          </div>
                          <p className="text-sm text-slate-200">{ans.content}</p>
                        </div>
                        {currentUser.permission >= 2 && (
                          <button
                            onClick={() => deleteQaAnswer(qa.id, ans.id)}
                            className="p-1 text-slate-500 hover:text-red-400"
                            title="刪除此回覆"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Answer Input */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="撰寫你的解答..."
                        value={ansTextMap[qa.id] || ''}
                        onChange={(e) => setAnsTextMap({ ...ansTextMap, [qa.id]: e.target.value })}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm"
                      />
                      <button
                        onClick={() => handleAddAnswer(qa.id)}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
                      >
                        回覆
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CLASS VOTING ================= */}
        {activeTab === 'vote' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Vote className="text-cyan-400" /> 班會投票區
              </h2>
              <p className="text-slate-400 text-sm">支援匿名投票、單選/多選與即時結果分析</p>
            </div>

            {/* Admin Add/Edit Vote Form */}
            {currentUser.permission >= 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                  {editingVoteId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingVoteId ? '修改投票活動 (LV.2 / LV.3 管理員專屬)' : '新增班會投票 (LV.2 / LV.3 管理員專屬)'}
                </h3>
                <form onSubmit={handleSaveVote} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="投票題目 / 主題"
                    value={voteTitle}
                    onChange={(e) => setVoteTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-400">投票選項</label>
                    {voteOptions.map((opt, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder={`選項 ${idx + 1}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(idx, e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm"
                        />
                        {voteOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOptionField(idx)}
                            className="p-2 text-red-400 hover:bg-slate-800 rounded-xl"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOptionField}
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> 增加選項
                    </button>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={voteIsAnonymous}
                        onChange={(e) => setVoteIsAnonymous(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span>匿名投票</span>
                    </label>

                    <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={voteIsMultiple}
                        onChange={(e) => setVoteIsMultiple(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-cyan-500"
                      />
                      <span>允許多選</span>
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-md shadow-cyan-600/20"
                    >
                      {editingVoteId ? '更新投票' : '發起投票'}
                    </button>
                    {editingVoteId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVoteId(null);
                          setVoteTitle(''); setVoteOptions(['', '']); setVoteIsAnonymous(true); setVoteIsMultiple(false);
                        }}
                        className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm"
                      >
                        取消
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {votes.map((vote) => {
              const totalVotes = vote.options.reduce((sum, opt) => sum + opt.votes.length, 0);

              return (
                <div key={vote.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                          {vote.isAnonymous ? '匿名投票' : '公開投票'}
                        </span>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                          {vote.isMultiple ? '多選' : '單選'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mt-2">{vote.title}</h3>
                    </div>

                    {currentUser.permission >= 2 && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => startEditVote(vote)}
                          className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl"
                          title="修改投票"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteVote(vote.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl"
                          title="刪除投票"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="space-y-4">
                    {vote.options.map((opt) => {
                      const count = opt.votes.length;
                      const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                      const hasVoted = opt.votes.includes(currentUser.username);

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleCastVote(vote.id, opt.id)}
                          className={`cursor-pointer border rounded-xl p-4 transition-all relative overflow-hidden ${
                            hasVoted ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                          }`}
                        >
                          {/* Progress Bar Background */}
                          <div
                            className="absolute top-0 left-0 bottom-0 bg-cyan-500/10 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className="font-medium text-slate-200 flex items-center gap-2">
                              {hasVoted ? <CheckCircle2 className="w-5 h-5 text-cyan-400" /> : <Circle className="w-5 h-5 text-slate-600" />}
                              {opt.text}
                            </span>
                            <div className="text-right">
                              <span className="font-bold text-cyan-400 font-mono">{percent}%</span>
                              <span className="text-xs text-slate-500 block">{count} 票</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-xs text-slate-500 text-right">總累積投票人數: {totalVotes} 票</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 6: LV.3 ADMIN PANEL ================= */}
        {activeTab === 'admin' && currentUser.permission === 3 && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 text-purple-400">
                <ShieldAlert /> LV.3 Boss 專屬後台 (帳號與權限重設)
              </h2>
              <p className="text-slate-400 text-sm">可隨時強制重設 2A 班同學密碼或調整 Permission Level</p>
            </div>

            {adminMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-xl p-4 flex items-center gap-2">
                <Check className="w-5 h-5" /> {adminMsg}
              </div>
            )}

            {/* Edit User Form */}
            <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-100">快速重設使用者資料</h3>
              <form onSubmit={handleUpdateUserData} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">選擇目標同學 (Username)</label>
                  <select
                    value={selectedUser}
                    onChange={(e) => {
                      setSelectedUser(e.target.value);
                      const u = users.find((x) => x.username === e.target.value);
                      if (u) setNewPermLevel(u.permission);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                  >
                    <option value="">-- 請選擇同學 --</option>
                    {users.map((u) => (
                      <option key={u.username} value={u.username}>
                        {u.username} (LV.{u.permission})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">重設新密碼 (留空則維持原密碼)</label>
                  <input
                    type="text"
                    placeholder="輸入新密碼"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">設定 Permission Level</label>
                  <select
                    value={newPermLevel}
                    onChange={(e) => setNewPermLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                  >
                    <option value={1}>LV.1 - USERS (普通同學)</option>
                    <option value={2}>LV.2 - ADMINS (班幹事)</option>
                    <option value={3}>LV.3 - BOSS / OWNER (最高權限)</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={!selectedUser}
                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-purple-600/20"
                  >
                    即時套用修改
                  </button>
                </div>
              </form>
            </div>

            {/* All Users Overview Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800 font-bold text-slate-200">全班 35 位同學帳號名單與權限對照</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-3">Username</th>
                      <th className="px-6 py-3">Password</th>
                      <th className="px-6 py-3">Permission Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map((u) => (
                      <tr key={u.username} className="hover:bg-slate-800/40">
                        <td className="px-6 py-3 font-mono font-bold text-blue-400">{u.username}</td>
                        <td className="px-6 py-3 font-mono">{u.password}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                              u.permission === 3
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                : u.permission === 2
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            LV.{u.permission} {u.permission === 3 ? '(BOSS)' : u.permission === 2 ? '(ADMIN)' : '(USER)'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}