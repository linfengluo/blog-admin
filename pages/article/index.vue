<!--
    Created by linfengluo@gmail.com on 2018/12/10.
-->

<template>
  <section class="articles">
    <div class="page__header">
      <a-button class="page__header--button" @click="handleAdd">Add</a-button>
    </div>
    <a-table :rowSelection="rowSelection"
             :columns="columns"
             :dataSource="articles"
             rowKey="_id"
             :loading="isLoading"
             :pagination="pagination"
             @change="handleTableChange"
    >
      <template slot="action" slot-scope="text, data">
        <span>
          <a href="javascript:;" @click="handleEdit(data)">Edit</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleDelete(data._id)">Delete</a>
        </span>
      </template>
      <template slot="classify" slot-scope="text, data">
        <span>
          {{ data.classify.label }}
        </span>
      </template>
    </a-table>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import {SET_PAGE_TITLE} from '../../units/types'
  import apiConfig from '../../units/apiConfig'
  const columns = [
    {
      title: '_id',
      key: '_id',
      dataIndex: '_id',
    },
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Classify',
      key: 'classify',
      dataIndex: 'classify',
      scopedSlots: {
        customRender: 'classify'
      }
    },
    {
      title: 'CreatedAt',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ]

  export default {
    async asyncData({store, query}) {
      store.commit('SET_PAGE_TITLE', '文章列表')
      let data = await store.dispatch('getArticles', query)
      return {
        articles: data.results,
        pagination: {
          current: Number(data.current) || 1,
          pageSize: Number(data.pageSize) || 1,
          total: Number(data.total) || 0
        }
      }
    },
    head: {},
    data() {
      return {
        columns,
        data: [],
        isShowModal: false,
        editId: '',
        isLoading: false,
        form: this.$form.createForm(this),
      }
    },
    components: {},
    mixins: [],
    created(){
    },
    mounted(){
    },
    watch: {
      '$route'(){
        this.initData()
      }
    },
    computed: {
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
      initData(){
        let query = { ...this.$route.query }
        this.isLoading = true
        this.$store.dispatch('getArticles', query)
          .then(res =>{
            this.articles = res.results
            this.isLoading = false
            this.pagination = {
              current: Number(res.current) || 1,
              pageSize: Number(res.pageSize) || 1,
              total: Number(res.total) || 0
            }
          })
      },
      handleTableChange (pagination, filters, sorter) {
        let query = { ...this.$route.query };
        query.page = pagination.current;

        this.$router.push({
          name: 'article',
          query: query
        })
      },
      handleEdit(data){
        this.$router.push({
          name: 'article-edit',
          query: {
            id: data._id
          }
        })
      },
      handleDelete(id){
        const _this = this
        this.$confirm({
          title: '确定删除文章？',
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
        this.$axios({
          method: 'delete',
          url: apiConfig.article,
          data: {
            id: id,
            noCache: Math.random()
          }
        }).then(res => {
          if (res.code < 400) {
            this.$message.success('删除成功');
            this.$store.dispatch('getArticles', this.$route.query)
              .then(res => {
                this.articles = res.results
              })
          } else {
            this.$message.success(res.msg ? res.msg : '删除失败');
          }
        }).catch(err => {
          this.$message.success('删除失败');
        });
      },

      handleAdd(){
        this.$router.push({
          name: 'article-edit'
        })
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
