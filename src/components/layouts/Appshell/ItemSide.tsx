import React, { useEffect, useState } from 'react'

import {
  MdOutlineDashboard,
  MdOutlineAssessment,
  MdOutlineManageAccounts
} from 'react-icons/md'
import { CiDatabase } from 'react-icons/ci'
import { TbReport } from 'react-icons/tb'
import Sidebar, { SidebarItem } from './Sidebar'

type ItemProps = {
  isSidebarOpen: boolean // Pastikan `isSidebarOpen` bertipe boolean
}
const Item: React.FC<ItemProps> = ({ isSidebarOpen }) => {
  const url =
    typeof window != 'undefined' ? window.location.href.split('/') : 'rtt'

  const [menu, setMenu] = useState('')
  const [user, setUser] = useState<string>('')

  useEffect(() => {
    if (typeof url[3] != 'undefined') {
      setMenu(url[3])
    }
  }, [url])
  useEffect(() => {
    const userData = localStorage.getItem('user')
    setUser(userData || '')
  }, [url])
  return (
    <div
      className={`fixed w-64 h-full bg-[#222d32] shadow-md ${
        isSidebarOpen ? 'block' : 'hidden'
      }`}
    >
      {user == 'user' && (
        <Sidebar isSidebarOpen>
          <SidebarItem
            href='/dashboard-user'
            icon={<MdOutlineDashboard size={22} />}
            text='Dashboard'
            active={menu === 'dashboard' && true}
          />
          <SidebarItem
            href='/domain-user'
            icon={<MdOutlineDashboard size={22} />}
            text='Domain'
            active={menu === 'domain' && true}
          />
          <SidebarItem
            href='/aspek-user'
            icon={<CiDatabase size={22} />}
            text='Aspek'
            active={menu === 'aspek' && true}
          />
          <SidebarItem
            href='/indikator-user'
            icon={<CiDatabase size={22} />}
            text='Indikator'
            active={menu === 'indikator' && true}
          />
          <SidebarItem
            href='/cobit'
            icon={<CiDatabase size={22} />}
            text={'COBIT 5'}
            active={menu === 'cobit' && true}
          />
          <SidebarItem
            href='/penilaian'
            icon={<MdOutlineAssessment size={22} />}
            text='Laporan Penilaian'
            active={menu === 'penilaian' && true}
          />
        </Sidebar>
      )}

      {user == 'admin' && (
        <Sidebar isSidebarOpen>
          <SidebarItem
            href='/dashboard'
            icon={<MdOutlineDashboard size={22} />}
            text='Dashboard'
            active={menu === 'dashboard' && true}
          />
          <SidebarItem
            href='/domain'
            icon={<MdOutlineDashboard size={22} />}
            text='Domain'
            active={menu === 'domain' && true}
          />
          <SidebarItem
            href='/aspek'
            icon={<CiDatabase size={22} />}
            text='Aspek'
            active={menu === 'aspek' && true}
          />
          <SidebarItem
            href='/indikator'
            icon={<CiDatabase size={22} />}
            text='Indikator'
            active={menu === 'indikator' && true}
          />
          <SidebarItem
            href='/cobit'
            icon={<CiDatabase size={22} />}
            text='COBIT 5'
            active={menu === 'cobit' && true}
          />
          <SidebarItem
            href='/penilaian'
            icon={<MdOutlineAssessment size={22} />}
            text='Laporan Penilaian'
            active={menu === 'penilaian' && true}
          />
          <SidebarItem
            href='/user'
            icon={<MdOutlineAssessment size={22} />}
            text='User'
            active={menu === 'user' && true}
          />
        </Sidebar>
      )}
    </div>
  )
}

export default Item

{
  /* <div
      className={`fixed w-64 h-full bg-[#222d32] shadow-md ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    ></div> */
}
