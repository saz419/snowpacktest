import React, { useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Badge,
} from "@mantine/core";

export interface clientsDataType {
  avatar: string;
  name: string;
  email: string;
  job: string;
  id: string;
  nationality: {
    title: string;
    color: string;
  }[];
}

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface TableSelectionProps {
  data: clientsDataType[];
}

function TableSelection({ data }: TableSelectionProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<string[]>([]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item, idx) => {
    const selected = selection.includes(item.id);
    return (
      <tr
        key={idx}
        className={`client-tabel-row ${
          selected && "client-tabel-row-selected"
        }`}
      >
        <td key={`${idx}-1`}>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
            color="violet"
          />
        </td>
        <td key={`${idx}-2`}>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td key={`${idx}-3`} className="">
          {item.email}
        </td>
        <td key={`${idx}-4`}>
          {item.nationality.map((n) => (
            <Badge color={n.color} className="ml-1">
              {n.title}
            </Badge>
          ))}
        </td>
        <td key={`${idx}-5`} className="">
          {item.job}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        className="rounded-lg bg-white p-5 shadow-lg border-[1px] border-y-zinc-200"
      >
        <thead className="bg-[#F4F5F7]">
          <tr>
            <th key={"1"} style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
                color="violet"
              />
            </th>
            <th key={"2"}>User</th>
            <th key={"3"}>Email</th>
            <th key={"4"}>Nationality</th>
            <th key={"5"}>Job</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default TableSelection;
