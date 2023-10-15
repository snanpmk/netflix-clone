import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../requests'

const Home = () => {
  return (
    <>
      <Main />
      <Row RowId = '1' title='UpComing' fetchURL = {requests.requestUpcoming} />
      <Row RowId = '2' title='TopRated' fetchURL = {requests.requestToprated} />
      <Row RowId = '3' title='Popular' fetchURL = {requests.requestPoplular} />
      <Row RowId = '4' title='Tending' fetchURL = {requests.requestTrending} />
      <Row RowId = '5' title='Horror' fetchURL = {requests.requestHorror} />
    </>
  )
}

export default Home
