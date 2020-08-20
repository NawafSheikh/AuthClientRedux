import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, InputNumber, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  storeDataAsync,
  deleteDataAsync,
  updateDataAsync
} from './dataSlice';

const EditableContext = React.createContext();


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="inline"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="Class"
          label="Class"
          rules={[
            {
              required: true,
              message: 'Please input the class!',
            },
          ]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <br/>
        <br/>
        <Form.Item
          name="Marks"
          label="Marks"
          rules={[
            {
              required: true,
              message: 'Please input the marks!',
            },
          ]}
        >
          <InputNumber
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />
        </Form.Item>
        <Form.Item
          name="Subject"
          label="Subject"
          rules={[
            {
              required: true,
              message: 'Please input the subject!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function Data ()
{
  const [visible, setVisible] = useState(false);
  const onCreate = values => {
    console.log('Received values of form: ', values);
    dispatch(storeDataAsync(values.Class, values.Subject, values.Marks))
    setVisible(false);
  };
  const dispatch = useDispatch();
  const dataSource = useSelector(state => state.data.lst);
  const columns = [
    {
      title: 'Class',
      dataIndex: 'class',
      width: '30%',
      editable: true,
      align:'center',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      editable: true,
      align:'center',
      width: '30%',
    },
    {
      title: 'Marks %',
      dataIndex: 'marks',
      editable: true,
      width: '30%',
      align:'center',
    },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      width: '10%',
      align:'center',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => dispatch(deleteDataAsync(record.key))}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const column = columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: dispatch(updateDataAsync()),
        }),
      };
    });
    return (
      <div>
        <Row gutter={[16, 32]}>
          <Col/>
        </Row>
        <Row>
        <Col span={16} offset={4}>
        <div>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Add Data
        </Button>
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={column}
        />
      </div>
        </Col>
      </Row>
      </div>

    );
}

export default Data;
