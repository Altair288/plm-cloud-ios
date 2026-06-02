import { View } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { PageContainer } from '@/components/layout/page-container';
import { SectionCard } from '@/components/layout/section-card';
import { ListRow } from '@/components/layout/list-row';
import { BrandColors, PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';
import { useAuth } from '@/hooks/use-auth';

const metrics = [
  { label: '产品档案', value: '128', tone: PlatformColors.systemBlue },
  { label: '待办任务', value: '18', tone: PlatformColors.systemOrange },
  { label: '数据版本', value: '42', tone: PlatformColors.systemGreen },
] as const;

const activities = [
  { title: '分类批量调整已完成', detail: '装备制造 / 泵阀类目', time: '09:42' },
  { title: '属性模板待确认', detail: '原材料代码规则 V03', time: '11:18' },
  { title: '产品结构更新', detail: 'A100 控制柜 BOM', time: '14:06' },
] as const;

export default function HomeScreen() {
  const { userInfo } = useAuth();
  const workspaceName = userInfo?.currentWorkspace?.workspaceName ?? 'PLM Cloud 演示空间';
  const displayName = userInfo?.displayName ?? '平台管理员';

  return (
    <PageContainer
      style={{ backgroundColor: PlatformColors.systemGroupedBackground }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View
        style={{
          backgroundColor: BrandColors.primary,
          borderRadius: 18,
          borderCurve: 'continuous',
          padding: 18,
          gap: 18,
          overflow: 'hidden',
          boxShadow: '0 10px 22px rgba(10, 132, 255, 0.18)',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              borderCurve: 'continuous',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source="sf:building.2"
              style={{ width: 24, height: 24, tintColor: '#FFFFFF' }}
              contentFit="contain"
            />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <ThemedText variant="footnote" style={{ color: 'rgba(255, 255, 255, 0.78)' }}>
              当前工作空间
            </ThemedText>
            <ThemedText variant="headline" style={{ color: '#FFFFFF' }}>
              {workspaceName}
            </ThemedText>
          </View>
        </View>

        <View style={{ gap: 4 }}>
          <ThemedText variant="title2" style={{ color: '#FFFFFF' }}>
            {displayName}，今天需要关注这些事项
          </ThemedText>
          <ThemedText variant="callout" style={{ color: 'rgba(255, 255, 255, 0.82)' }}>
            数据建设、产品协同与审批任务集中在移动工作台展示。
          </ThemedText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        {metrics.map((metric) => (
          <View
            key={metric.label}
            style={{
              flex: 1,
              minHeight: 96,
              backgroundColor: PlatformColors.secondarySystemGroupedBackground,
              borderRadius: 14,
              borderCurve: 'continuous',
              padding: 12,
              gap: 10,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: metric.tone,
              }}
            />
            <ThemedText variant="title2" style={{ fontVariant: ['tabular-nums'] }}>
              {metric.value}
            </ThemedText>
            <ThemedText variant="caption1" secondary>
              {metric.label}
            </ThemedText>
          </View>
        ))}
      </View>

      <SectionCard title="快捷入口">
        <Link href={'/(main)/products' as never} asChild>
          <ListRow label="产品数据" value="查看" icon="cube.box" iconTint={BrandColors.primary} />
        </Link>
        <Link href={'/(main)/tasks' as never} asChild>
          <ListRow label="我的任务" value="18 项" icon="checkmark.circle" iconTint="#FF9500" />
        </Link>
        <ListRow label="分类与属性" value="即将开放" icon="slider.horizontal.3" iconTint="#34C759" chevron={false} />
      </SectionCard>

      <SectionCard title="近期动态">
        {activities.map((activity) => (
          <View
            key={activity.title}
            style={{
              flexDirection: 'row',
              gap: 12,
              paddingHorizontal: 16,
              paddingVertical: 13,
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: BrandColors.primary,
                marginTop: 8,
              }}
            />
            <View style={{ flex: 1, gap: 3 }}>
              <ThemedText variant="body">{activity.title}</ThemedText>
              <ThemedText variant="footnote" secondary>
                {activity.detail}
              </ThemedText>
            </View>
            <ThemedText
              variant="footnote"
              secondary
              style={{ fontVariant: ['tabular-nums'] }}
            >
              {activity.time}
            </ThemedText>
          </View>
        ))}
      </SectionCard>
    </PageContainer>
  );
}
