/**
 * @format
 * 全局团队故事静态数据 (Mock)
 * 用于模拟展示团队空间的故事摘要、案例分享等功能模块
 */

export interface TeamStory {
  teamId: string | number
  teamName: string
  storySummary: string
  storyDetailUrl: string
}

export const TEAM_STORY_LIST: TeamStory[] = [
  {
    teamId: 'T-1001',
    teamName: '光影探路者',
    storySummary: '我们穿梭于城市的大街小巷，致力于用镜头记录那些即将消逝的工业遗迹与老街风貌，保存城市记忆。',
    storyDetailUrl: '/team/story/T-1001'
  },
  {
    teamId: 'T-1002',
    teamName: '极简视觉实验室',
    storySummary: '专注于现代建筑的几何之美，探索光影与混凝土交织下的数字胶片质感，传递极简生活理念。',
    storyDetailUrl: '/team/story/T-1002'
  },
  {
    teamId: 'T-1003',
    teamName: '风光纪实联盟',
    storySummary: '一群热爱自然风光的摄影师，将足迹踏遍祖国名山大川，致力于用超高清影像分享大自然的鬼斧神工。',
    storyDetailUrl: '/team/story/T-1003'
  },
  {
    teamId: 'T-1004',
    teamName: '街头叙事计划',
    storySummary: '在平凡的日常中捕捉不平凡的瞬间。我们用镜头讲述街头行人的真实故事，展现城市的生活温度。',
    storyDetailUrl: '/team/story/T-1004'
  }
]
