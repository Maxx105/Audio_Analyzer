import React from "react";
import "./style.css";

function AudioFileUploadForm(props) {
    return (
        <form className="" action="/api/audiofile" encType="multipart/form-data" id="audiofile_form" onSubmit={props.onSubmit}>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Upload Audio File</label>
                <input className="form-control" type="file" id="formFile"/>
                <button type="submit" className="btn btn-primary mb-3">Submit</button>
            </div>
        </form>
    );
}

export default AudioFileUploadForm;