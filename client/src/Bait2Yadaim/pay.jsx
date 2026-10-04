import React from 'react'

const pay = () => {
    return (
        <div>
            <h1 className="sr-only">תשלום עבור הקורס בית בשתי ידיים</h1>
            <iframe
                title="טופס תשלום מאובטח"
                src="https://secure.cardcom.solutions/e/nLaM8Ld8qU6GjHF85jqFQ"
                width="100%"
                height="1000px"
                frameBorder="0"
                style={{ border: 'none' }}>
            </iframe>
        </div>
    )
}

export default pay