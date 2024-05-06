import React from 'react'
import styled from 'styled-components'
import en from '../components/language/languages/EN.json'
import se from '../components/language/languages/SE.json'
import { useLanguage } from '../components/language/LanguageContext'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Sidebar = ({userId, childIds, childId}) => {
    // const { id: childId, schoolId } = useParams()

    const { language } = useLanguage()
    const lang = language === 'se' ? se : en
    return (
        <SidebarContainer>
            <SidebarItem>
                {lang.absence}
                <DropdownMenu>
                    <StyledLink to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </StyledLink>
                    <StyledLink to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </StyledLink>
                </DropdownMenu>
            </SidebarItem>
            <SidebarItem>
                {lang.schedule}
                <DropdownMenu>
                    <StyledLink to={`/show/${childId}`}>
                        <DropdownItem>{lang.view_schedule}</DropdownItem>
                    </StyledLink>
                    <StyledLink to={`/change/${childId}`}>
                        <DropdownItem>{lang.change_schedule}</DropdownItem>
                    </StyledLink>
                    <StyledLink to={`/requested/${childId}`}>
                        <DropdownItem>{lang.req_schedule}</DropdownItem>
                    </StyledLink>
                </DropdownMenu>
            </SidebarItem>
            <SidebarItem>
                {lang.information_from_school}
                <DropdownMenu>
                    <StyledLink to="/view_absence">
                        <DropdownItem>{lang.weekly_letter}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/report_absence">
                        <DropdownItem>{lang.important_dates}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/schedule_absence">
                        <DropdownItem>{lang.lunch_menu}</DropdownItem>
                    </StyledLink>
                </DropdownMenu>
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.contact_school}
                <DropdownMenu>
                    {/* <StyledLink to={`/contact/teacher/${schoolId}/${childId}`}>
                        <DropdownItem>{lang.contact_teacher}</DropdownItem>
                    </StyledLink>
                    <StyledLink to={`/contact/management/${schoolId}/${childId}`}>
                        <DropdownItem>{lang.contact_management}</DropdownItem>
                    </StyledLink>
                    <StyledLink to={`/contact/health/${schoolId}/${childId}`}>
                        <DropdownItem>{lang.contact_health}</DropdownItem>
                    </StyledLink>
                    <StyledLink to={`/contact/parent/${schoolId}/${childId}`}>
                        <DropdownItem>{lang.contact_parents}</DropdownItem>
                    </StyledLink> */}
                </DropdownMenu>
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.my_page}
                <DropdownMenu>
                    <StyledLink to={`/usercontact/${userId}`}>
                        <DropdownItem>
                            {lang.parent_contact_details}
                        </DropdownItem>
                    </StyledLink>
                    <StyledLink to="/report_absence">
                        <DropdownItem>{lang.parent_children}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/schedule_absence">
                        <DropdownItem>{lang.parent_income}</DropdownItem>
                    </StyledLink>
                </DropdownMenu>
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.applications}
                {/* <DropdownMenu>
                    <StyledLink to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </StyledLink>
                    <StyledLink to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </StyledLink>
                </DropdownMenu> */}
            </SidebarItem>{' '}
            <SidebarItem>
                {lang.fees}
                {/* <DropdownMenu>
                    <StyledLink to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </StyledLink>
                    <StyledLink to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </StyledLink>
                </DropdownMenu> */}
            </SidebarItem>
            <SidebarItem>
                {lang.howto_title}
                {/* <DropdownMenu>
                    <StyledLink to="/view_absence">
                        <DropdownItem>{lang.view_absence}</DropdownItem>
                    </StyledLink>
                    <StyledLink to="/report_absence">
                        <DropdownItem>
                            {lang.report_todays_abscent}
                        </DropdownItem>
                    </StyledLink>
                    <StyledLink to="/schedule_absence">
                        <DropdownItem>{lang.schedule_absence}</DropdownItem>
                    </StyledLink>
                </DropdownMenu> */}
            </SidebarItem>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 80px;
    height: 100vh;
    width: 250px;
    background-color: #333;
    color: #fff;
    padding: 20px;
    overflow-y: auto;
`

const DropdownMenu = styled.div`
    display: none;
    padding-left: 10px;
    margin-top: 5px;
    text-align: left;
`

const SidebarItem = styled.div`
    margin-bottom: 25px;
    text-align: left;
    font-size: 22px;

    &:hover ${DropdownMenu} {
        display: block;
    }
`

const DropdownItem = styled.div`
    padding: 5px 0;
    cursor: pointer;
    font-size: 18px;

    &:hover {
        color: #ffd700;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;`
