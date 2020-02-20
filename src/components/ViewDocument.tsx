import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DocumentViewer from './DocumentViewer';
import getServerURL from '../serverOverride';

interface Props {
  documentId: string | undefined,
}

interface State {
  pdfFile: File | undefined,
  numPages: number,
}

class ViewDocument extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      pdfFile: undefined,
      numPages: 0,
    };
  }

  componentDidMount() {
    const {
      documentId,
    } = this.props;
    fetch(`${getServerURL()}/download?FileID=${documentId}`, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      console.log(response);
      return response.blob();
    })
      .then((response) => {
        const pdfFile = new File([response], "Filename PDF");
        this.setState({ pdfFile });
      });
  }

  onDocumentLoadSuccess(numPages: number) {
    this.setState({ numPages });
  }

  render() {
    const {
      pdfFile,
    } = this.state;
    return (
      <div>
        { pdfFile ? <DocumentViewer pdfFile={pdfFile} /> : <div /> }
        <Link to="/my-documents">
          <button type="button">
            Back
          </button>
        </Link>
      </div>
    );
  }
}

export default ViewDocument;
