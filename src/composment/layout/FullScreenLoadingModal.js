import React from 'react'
import { MDBModal } from 'mdbreact'

export default function FullScreenLoadingModal(props) {
    return (
        <div>
            <MDBModal isOpen={props.open === true} toggle={() => { }} size="sm" >
                <div className="text-center mt-5 mb-5">
                    <div className="spinner-border spinner-border-lg text-primary fast" role="status" style={{
                        width: "4rem",
                        height: "4rem"
                    }}>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </MDBModal>
        </div >
    )
}
