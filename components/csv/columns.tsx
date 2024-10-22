'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { User } from '../../interfaces'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    cell: ({ row }) => {
      const emailVerified = row.getValue('emailVerified')

      return emailVerified ? (
        <CheckCircledIcon className='h-6 w-6 text-green-500' />
      ) : (
        <CrossCircledIcon className='h-6 w-6 text-red-500' />
      )
    },
  },
  {
    accessorKey: 'enabled',
    header: 'Enabled',
    cell: ({ row }) => {
      const enabled = row.getValue('enabled')

      return enabled ? (
        <CheckCircledIcon className='h-6 w-6 text-green-500' />
      ) : (
        <CrossCircledIcon className='h-6 w-6 text-red-500' />
      )
    },
  },
  {
    accessorKey: 'groups',
    header: 'Groups',
    cell: ({ row }) => {
      const groups: any = row.getValue('groups')

      return <div>{groups.join(', ')}</div>
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const user = row.original
      // access deleteRow function in table meta
      const { deleteRow } = table.options.meta as any

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.username)}
            >
              Copy username
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteRow(user)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
