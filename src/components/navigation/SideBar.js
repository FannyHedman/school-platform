import React from 'react'
import styled from 'styled-components'
import en from '../language/languages/EN.json'
import se from '../language/languages/SE.json'
import { useLanguage } from '../language/LanguageContext'
import { Link, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Sidebar = ({ userId, childIds }) => {
    // const { id: childId, schoolId } = useParams()
    const { language } = useLanguage()
    const lang = language === 'se' ? se : en
    const storedChildId = localStorage.getItem('childId')

    const location = useLocation() // Get current URL information

    return (
        <div>
            {!(
                location.pathname === '/' || location.pathname === '/profile'
            ) && (
                <SidebarContainer>
                  <SidebarItem>
                       <StyledLink to={`/childprofile/${storedChildId}`}>{lang.your_child}</StyledLink>
                    </SidebarItem>
                    <SidebarItem>
                        {lang.absence}
                        <DropdownMenu>
                            <StyledLink to="/view_absence">
                                <DropdownItem>{lang.view_absence}</DropdownItem>
                            </StyledLink>
                            <StyledLink to={`/absence/${storedChildId}`}>
                                <DropdownItem>
                                    {lang.report_todays_abscent}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to="/schedule_absence">
                                <DropdownItem>
                                    {lang.schedule_absence}
                                </DropdownItem>
                            </StyledLink>
                        </DropdownMenu>
                    </SidebarItem>
                    <SidebarItem>
                        {lang.schedule}
                        <DropdownMenu>
                            <StyledLink
                                to={`/show/${storedChildId || 'select-child'}`}

                            >
                                <DropdownItem>
                                    {lang.view_schedule}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink
                                to={`/change/${
                                    storedChildId || 'select-child'
                                }`}

                            >
                                <DropdownItem>
                                    {lang.change_schedule}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to={`/requested/${storedChildId}`}>
                                <DropdownItem>{lang.req_schedule}</DropdownItem>
                            </StyledLink>
                        </DropdownMenu>
                    </SidebarItem>
                    <SidebarItem>
                        {lang.information_from_school}
                        <DropdownMenu>
                            <StyledLink to="/weekly">
                                <DropdownItem>
                                    {lang.weekly_letter}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to="/report_absence">
                                <DropdownItem>
                                    {lang.important_dates}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to="/lunch_menu">
                                <DropdownItem>{lang.lunch_menu}</DropdownItem>
                            </StyledLink>
                        </DropdownMenu>
                    </SidebarItem>{' '}
                    <SidebarItem>
                        {lang.contact_school}
                        <DropdownMenu>
                            <StyledLink
                                to={`/contact/teacher/${storedChildId}`}
                            >
                                <DropdownItem>
                                    {lang.contact_teacher}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink
                                to={`/contact/management/${storedChildId}`}
                            >
                                <DropdownItem>
                                    {lang.contact_management}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to={`/contact/health/${storedChildId}`}>
                                <DropdownItem>
                                    {lang.contact_health}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to={`/contact/parent/${storedChildId}`}>
                                <DropdownItem>
                                    {lang.contact_parents}
                                </DropdownItem>
                            </StyledLink>
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
                                <DropdownItem>
                                    {lang.parent_children}
                                </DropdownItem>
                            </StyledLink>
                            <StyledLink to="/schedule_absence">
                                <DropdownItem>
                                    {lang.parent_income}
                                </DropdownItem>
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
            )}
            ,
        </div>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    /* margin-top: 80px; */
    height: 100vh;
    width: 350px;
    background-color: white;
    color: black;
    padding: 20px;
    padding-top: 120px;
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
    font-size: 18px;
    font-family: 'Rubik', sans-serif;
    position: relative; /* Add position relative */
    border-bottom: 2px solid black; /* Add border */
    padding-bottom: 20px; /* Add padding bottom */

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
    color: black;
`
