<!--
    Created by linfengluo@gmail.com on 2018/12/11.
-->
<template>
  <section class="classify">
    <div class="page__header">
      <a-button class="page__header--button" @click="handleAdd">Add</a-button>
    </div>
    <a-table :rowSelection="rowSelection"
             :columns="columns"
             :dataSource="classify"
             rowKey="_id"
             :pagination="false">
      <template slot="action" slot-scope="text, data">
        <span>
          <a href="javascript:;" @click="handleEdit(data)">Edit</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleDelete(data._id)">Delete</a>
        </span>
      </template>
    </a-table>
    <a-modal
      title="添加"
      :visible="isShowModal"
      @ok="submitEdit"
      @cancel="toggleModal"
      :form="form"
    >
      <a-form :form="form">
        <a-form-item
          label='classify'
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 15 }"
        >
          <a-input placeholder='请输入分类名'
                   v-decorator="[
                     'classify',
                     {rules: [{ required: true, message: 'Please input your note!' }]}
                   ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import {SET_PAGE_TITLE} from '../../units/types'
  const columns = [
    {
      title: '_id',
      key: '_id',
      dataIndex: '_id',
    }, {
      title: 'Label',
      key: 'label',
      dataIndex: 'label',
    }, {
      title: 'CreatedAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
    }, {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]

  export default {
    async asyncData({store}) {
      store.commit('SET_PAGE_TITLE', '分类列表')
      store.dispatch('getClassify');
      return {}
    },
    head: {},
    data() {
      return {
        columns,
        data: [],
        isShowModal: false,
        editId: '',
        form: this.$form.createForm(this),
      }
    },
    components: {},
    mixins: [],
    created(){
    },
    mounted(){
    },
    watch: {},
    computed: {
      ...mapState({
        classify: state => state.classify
      }),
      rowSelection() {
        const {selectedRowKeys} = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }
          }),
        }
      }
    },
    methods: {
      ...mapActions([
        'updateClassify'
      ]),
      handleEdit(data){
        this.editId = data._id
        this.toggleModal()

        this.$nextTick(() => {
          this.form.setFieldsValue({
            classify: data.label
          })
        })
      },

      handleDelete(id){
        const _this = this
        this.$confirm({
          title: '确定删除分类？',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            _this.comfirmDelete(id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },

      comfirmDelete(id){
        this.updateClassify({
          type: 'delete',
          params: {
            id: id
          }
        }).then(res => {
          this.$message.success('删除成功');
          this.$store.dispatch('getClassify')
        })
      },
      submitEdit(e){
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            let params = {
              label: values.classify
            }

            if (this.editId) {
              params.id = this.editId
            }
            this.updateClassify({
              type: this.editId ? 'put' : 'post',
              params: params
            }).then(res => {
              this.toggleModal()
              this.$message.success(this.editId ? '更新成功' : '创建成功');
              this.$store.dispatch('getClassify')
            })
          }
        })
      },
      handleAdd(){
        this.editId = null
        this.toggleModal()
      },

      toggleModal(){
        const status = !this.isShowModal
        this.isShowModal = status

        if (!status) {
          this.$nextTick(() => {
            this.form.resetFields()
          })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
