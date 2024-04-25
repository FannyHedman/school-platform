import React from 'react'
import styled from 'styled-components'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'
import { useLanguage } from '../components/language/LanguageContext'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Sidebar = () => {
    const { id: childId, schoolId } = useParams()

    const { language } = useLanguage()
    const lang = language === 'se' ? se : en
    return (
        <SidebarContainer>
            <SidebarItem>
                {lang.absence}
                <DropdownMenu>
                    <Link to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </Link>
                    <Link to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </Link>
                    <Link to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </Link>
                </DropdownMenu>
            </SidebarItem>
            <SidebarItem>
                {lang.schedule}
                <DropdownMenu>
                    <Link to={`/schedule/${childId}/show`}>
                        <DropdownItem>{lang.view_schedule}</DropdownItem>
                    </Link>
                    <Link to={`/schedule/${childId}/change`}>
                        <DropdownItem>{lang.change_schedule}</DropdownItem>
                    </Link>
                    <Link to={`/schedule/${childId}/requested`}>
                        <DropdownItem>{lang.req_schedule}</DropdownItem>
                    </Link>
                </DropdownMenu>
            </SidebarItem>
            <SidebarItem>
                {lang.information_from_school}
                <DropdownMenu>
                    <Link to="/view_absence">
                        <DropdownItem>{lang.weekly_letter}</DropdownItem>
                    </Link>
                    <Link to="/report_absence">
                        <DropdownItem>{lang.important_dates}</DropdownItem>
                    </Link>
                    <Link to="/schedule_absence">
                        <DropdownItem>{lang.lunch_menu}</DropdownItem>
                    </Link>
                </DropdownMenu>
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.contact_school}
                <DropdownMenu>
                    <Link to={`/contact/teacher/${schoolId}`}>
                        <DropdownItem>{lang.contact_teacher}</DropdownItem>
                    </Link>
                    <Link to={`/contact/management/${schoolId}`}>
                        <DropdownItem>{lang.contact_management}</DropdownItem>
                    </Link>
                    <Link to={`/contact/health/${schoolId}`}>
                        <DropdownItem>{lang.contact_health}</DropdownItem>
                    </Link>
                    <Link to={`/contact/parent/${schoolId}`}>
                        <DropdownItem>{lang.contact_parents}</DropdownItem>
                    </Link>
                </DropdownMenu>
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.my_page}
                <DropdownMenu>
                    <Link to="/view_absence">
                        <DropdownItem>
                            {lang.parent_contact_details}
                        </DropdownItem>
                    </Link>
                    <Link to="/report_absence">
                        <DropdownItem>{lang.parent_children}</DropdownItem>
                    </Link>
                    <Link to="/schedule_absence">
                        <DropdownItem>{lang.parent_income}</DropdownItem>
                    </Link>
                </DropdownMenu>
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.applications}
                {/* <DropdownMenu>
                    <Link to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </Link>
                    <Link to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </Link>
                    <Link to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </Link>
                </DropdownMenu> */}
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.fees}
                {/* <DropdownMenu>
                    <Link to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </Link>
                    <Link to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </Link>
                    <Link to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </Link>
                </DropdownMenu> */}
            </SidebarItem>
            <SidebarItem>
                {lang.howto_title}
                {/* <DropdownMenu>
                    <Link to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </Link>
                    <Link to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </Link>
                    <Link to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </Link>
                </DropdownMenu> */}
            </SidebarItem>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    width: 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
`

const DropdownMenu = styled.div`
    display: none;
    padding-left: 20px;
    margin-top: 5px;
`

const SidebarItem = styled.div`
    margin-bottom: 15px;

    &:hover ${DropdownMenu} {
        display: block;
    }
`

const DropdownItem = styled.div`
    padding: 5px 0;
    cursor: pointer;

    &:hover {
        color: #ffd700;
    }
`
