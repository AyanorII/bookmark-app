import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core'
import { useState } from 'react'

type MultiSelectCreatableProps = {
  options: string[]
  onChange?: (value: string[]) => void
  initialValue?: string[]
  empty?: string
}

export function MultiSelectCreatable({
  options,
  onChange,
  initialValue = [],
  empty = 'No options available',
}: MultiSelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  })

  const [search, setSearch] = useState('')
  const [data, setData] = useState(options)
  const [value, setValue] = useState<string[]>(initialValue)

  const exactOptionMatch = data.some((item) => item === search)

  const handleValueSelect = (val: string) => {
    setSearch('')

    if (val === '$create') {
      setData((current) => [...current, search])
      setValue((current) => [...current, search])
      onChange?.([...value, search])
    } else {
      setValue((current) => {
        onChange?.([
          ...(current.includes(val) ? current.filter((v) => v !== val) : [...current, val]),
        ])
        return current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      })
    }
  }

  const handleValueRemove = (val: string) => {
    setValue((current) => {
      const newValue = current.filter((v) => v !== val)
      onChange?.(newValue)
      return newValue
    })
  }

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ))

  const optionsEl = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ))

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex()
                  setSearch(event.currentTarget.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
                    event.preventDefault()
                    handleValueRemove(value[value.length - 1])
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {optionsEl}
          {optionsEl.length === 0 && search.trim().length === 0 && (
            <Combobox.Empty>{empty}</Combobox.Empty>
          )}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && optionsEl.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
