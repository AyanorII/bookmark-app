import { Data } from '@generated/data'
import { router, usePage } from '@inertiajs/react'
import { Avatar, Group, Menu, Stack, Switch, Text } from '@mantine/core'
import { BsPalette } from 'react-icons/bs'
import { FaMoon } from 'react-icons/fa6'
import { LuLogOut, LuSun } from 'react-icons/lu'

export const UserMenu = () => {
  const { props } = usePage()
  const user = props.user as Data.User

  return (
    <Menu closeOnItemClick={false} withArrow>
      <Menu.Target>
        <Avatar src={user.avatar} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <Group gap={12}>
            <Avatar src={user.avatar} />
            <Stack gap={0}>
              <Text size="sm">{user.fullName}</Text>
              <Text size="xs" c="dimmed">
                {user.email}
              </Text>
            </Stack>
          </Group>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<BsPalette />}>
          <Group>
            <Text size="sm" flex="1 1 auto">
              Theme
            </Text>
            <Switch
              size="md"
              onLabel={<FaMoon className="size-4" />}
              offLabel={<LuSun className="size-4" />}
            />
          </Group>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => router.post('/logout')} leftSection={<LuLogOut />}>
          <Text size="sm">Logout</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
