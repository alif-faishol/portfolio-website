import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {toggleMenu} from 'redux/modules/menu'
import {changeMenuContent} from 'redux/modules/menu'
import Button from 'App/common/styles/Button'

const RootContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  height: 50px;
  font-size: 20px;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex: 1 0 100px;
`

const ClosedMenu = props => (
  <RootContainer>
    <Column>
      <Link
        to='/'
        onClick={() => {
          props.changeMenuContent("home")
          props.toggleMenu(true)
        }}
      >
        <Button>
          Home
        </Button>
      </Link>
    </Column>
    <Column style={{flexGrow: 9}}>
      <span style={{margin: '0 auto'}}>
        {props.title}
      </span>
    </Column>
    <Column>
      {typeof(props.dynamicMenu.link) === "string"
          ? (
            <a href={props.dynamicMenu.link}>
              <Button
                style={{
                  marginLeft: 'auto'
                }}
              >
                {props.dynamicMenu.name}
              </Button>
            </a>
          )
          : (
            <Button
              onClick={() => {
                props.changeMenuContent("dynamicMenu")
                props.toggleMenu()
              }}
              style={{
                marginLeft: 'auto'
              }}
            >
              {props.dynamicMenu.button}
            </Button>
          )
      }
    </Column>
  </RootContainer>
)


export default connect(
  ({menu}) => ({
    dynamicMenu: menu.dynamicMenu,
    title: menu.title
  }),
  dispatch => ({
    toggleMenu: () => {
      dispatch(toggleMenu())
    },
    changeMenuContent: (content) => {
      dispatch(changeMenuContent(content))
    }
  })
)(ClosedMenu)
