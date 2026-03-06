import {
  Anchor,
  AnchorProps,
  Avatar,
  AvatarProps,
  Card,
  CardProps,
  Group,
  GroupProps,
  Stack,
  StackProps,
  Text,
  TextProps,
  Title,
  TitleProps,
} from '@mantine/core'
import React from 'react'
import { cn } from '~/lib/utils'

export const BookmarkCard = (props: CardProps) => {
  return <Card withBorder radius="lg" py={0} px={16} {...props} />
}

export const BookmarkCardHeader = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      gap={12}
      align="center"
      py={14}
      wrap="nowrap"
      className={cn('border-b border-b-gray-300', className)}
      {...props}
    />
  )
}

export const BookmarkCardBody = (props: StackProps) => {
  return <Stack gap={16} my={16} {...props} />
}

export const BookmarkCardFooter = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      gap={16}
      align="center"
      py={12}
      className={cn('border-t border-t-gray-200', className)}
      {...props}
    />
  )
}

export const BookmarkFavicon = (props: AvatarProps) => {
  return <Avatar radius="sm" w={44} h={44} flex="0 0 auto" {...props} />
}

export const BookmarkTitle = (props: TitleProps) => {
  return <Title order={3} size="md" {...props} />
}

export const BookmarkURL = (props: AnchorProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <Anchor c="dimmed" size="xs" {...props} />
}

export const BookmarkDescription = (props: TextProps & { children: React.ReactNode }) => {
  return <Text size="sm" c="dimmed" {...props} />
}

export const BookmarkTags = (props: GroupProps) => {
  return <Group gap={4} {...props} />
}

export const BookmarkStat = (
  props: GroupProps & { icon: React.ReactNode; value: React.ReactNode }
) => {
  const { icon, value, ...rest } = props
  return (
    <Group gap={4} align="center" {...rest}>
      {icon}
      <Text size="xs">{value}</Text>
    </Group>
  )
}
