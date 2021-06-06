import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keyword}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keyword}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome LazizbekDev\'s e-commerce website',
    description: 'LazizbekDev',
    keyword: 'LazizbekDev portfolio, e-commerce website, reactJs, electronics'
}

export default Meta
