'use client'

import React, { useEffect } from 'react'

import { faker } from '@faker-js/faker'
import { ColumnDef } from '@tanstack/react-table'
import { Users } from 'lucide-react'

import DataTable from '@/components/ui/datatable'

import { useBreadcrumbs } from '@/providers/BreadCrumbProvider'

const StudentContent = () => {
  const { setBreadcrumbs } = useBreadcrumbs()
  useEffect(() => {
    setBreadcrumbs([
      { label: 'Master Data', href: '/dashboard/admin' },
      { label: 'Siswa', href: '/dashboard/admin/siswa' }
    ])
  }, [])

  type Student = {
    id: number
    name: string
    studentClass: string
    entryYear: number
    username: string
  }

  const generateStudents = (count: number) => {
    return Array.from({ length: count }, (_, id) => ({
      id: id + 1,
      name: faker.person.fullName(),
      studentClass: `${faker.helpers.arrayElement(['X', 'XI', 'XII'])} ${faker.helpers.arrayElement(['IPA', 'IPS'])}-${faker.number.int({ min: 1, max: 3 })}`,
      entryYear: faker.number.int({ min: 2021, max: 2024 }),
      username: faker.internet.username()
    }))
  }

  type YearData = {
    year: number
    total: number
  }

  // Dummy data dulu
  const dummyYearData: YearData[] = [
    { year: 2024, total: 1200 },
    { year: 2023, total: 1100 },
    { year: 2022, total: 950 },
    { year: 2021, total: 870 }
  ]

  const cardColors = ['secondary', 'destructive', 'biru', 'success']
  const colorClasses: Record<string, string> = {
    secondary: 'text-secondary',
    destructive: 'text-destructive',
    biru: 'text-blue-500',
    success: 'text-success'
  }

  // const YearCards = () => {
  // const [yearData, setYearData] = useState<YearData[]>([]);

  //     useEffect(() => {
  //         const fetchDummyData = () => {
  //             setTimeout(() => setYearData(dummyYearData), 1000);
  //         };
  //         fetchDummyData();
  //     }, []);
  // }
  const students: Student[] = generateStudents(10)
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: 'name',
      header: 'Nama'
    },
    {
      accessorKey: 'studentClass',
      header: 'Kelas'
    },
    {
      accessorKey: 'entryYear',
      header: 'Tahun Masuk'
    },
    {
      accessorKey: 'username',
      header: 'Username'
    }
  ]

  return (
    <>
      <div>
        <p>Data Siswa</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5">
        <div className="flex w-full justify-between rounded-xl border-2 border-solid p-5 md:w-2/6">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Total Siswa</p>
            <span className="text-3xl font-semibold text-primary">3,217</span>
          </div>
          <div className="icon">
            <Users size={20} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {dummyYearData.map((item, index) => (
            <div key={item.year} className={`flex justify-between rounded-xl border-2 border-solid p-5 shadow-md`}>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Siswa masuk tahun {item.year}</p>
                <span className={`text-3xl font-semibold ${colorClasses[cardColors[index]]}`}>
                  {item.total.toLocaleString()}
                </span>
              </div>
              <div className="icon">
                <Users size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* datatable */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={students}
            // role="student"
            placeholder="Cari dari nama, kelas, atau tahun masuk"
          />
        </div>
      </div>
    </>
  )
}

export default StudentContent
