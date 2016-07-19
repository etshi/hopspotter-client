import React, { Component, PropTypes } from 'react'
import {Card, CardActions, CardHeader, CardTitle} from 'material-ui/Card'
import { GridList, GridTile } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'

export const VacationCard = ({image, title, center, status, onEdit, editLabel, centerLabel, statusLabel}) => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      width: 500,
      overflowY: 'auto'
    },
    card: {
      height: '200px'
    },
    cardHeader: {
      marginBottom: '2rem'
    },
    cardActions: {
      paddingBottom: 0,
      paddingLeft: 0,
      position: 'absolute',
      bottom: 0
    },
    button: {
      margin: 12,
      marginBottom: 0,
      color: '#fff',
      backgroundColor: '#FF6565',
      borderRadius: '3px',
      padding: '0.3rem'
    }
  }
  
  return (
    <div style={styles.root}>
      <GridList
        cellHeight={200}
        style={styles.gridList}>
        <GridTile>
          {(image) ? <img src={image} /> : <img src="http://ingridwu.dmmdmcfatter.com/wp-content/uploads/2015/01/placeholder.png" />}
        </GridTile>
        <GridTile>
          <Card style={styles.card}>
            <CardHeader title={title} style={styles.cardHeader} />
            <CardTitle>
              {center && <span><span style={{fontWeight: 'bold'}}>{`${centerLabel}: `}</span>{center}</span>}
              {center && status && <br />}
              {center && status && <br />}
              {status && <span><span style={{fontWeight: 'bold'}}>{`${statusLabel}: `}</span>{status}</span>}
            </CardTitle>
            <CardActions style={styles.cardActions}>
              <RaisedButton label={"edit this vacation"}
                onClick={onEdit}
                backgroundColor={styles.button.backgroundColor}
                labelColor={styles.button.color}
                style={styles.button} />
            </CardActions>
          </Card>
        </GridTile>
      </GridList>
    </div>
  )
}
VacationCard.propTypes = {
  center: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onEdit: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
VacationCard.contextTypes = {
  intl: PropTypes.object.isRequired
}
