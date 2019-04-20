import React, { Component } from 'react'

const columns = [
  { title: 'Id' },
  { title: 'Name' },
  { title: 'Type' },
  { title: 'Date uploaded' },
  { title: 'Size' }
]

class UploadFormTable extends Component {

  componentDidMount() {
    this.$el = window.$(this.el)
    this.table = this.$el.DataTable({
      data: this.props.data,
      columns,
      responsive: true,
      language: {
        searchPlaceholder: 'Search...',
        search: '',
        lengthMenu: '_MENU_ items/page',
      }
    })
  }

  componentWillUnmount() {
    this.table.destroy(true)
  }

  shouldComponentUpdate(nextProps) {
    this.table.clear().draw()
    this.table.rows.add(nextProps.data).draw()
    return true
  }

  render() {
    return (
      <div>
        <table className="display" width="100%" ref={el => this.el = el} data={this.props.data}></table>
      </div>
    )
  }

}

export default UploadFormTable