# qs-cusform 自定义表单

v2版与v1无法平滑升级，v2版会废弃v1的数据表（不会删除），请确认数据无需继承的场景下再执行升级操作

### [v1版本文档](https://github.com/quansitech/qs-cusform/blob/master/README_v1.md)



## 用法

### 1.安装及执行迁移
```shell script
composer require quansitech/cus-form
php artisan migrate
```


### 2. 配置

在根目录的PackageConfig.php文件添加配置项，配置项说明看注释

```php
'cusform' => [
    'jsOptions' => [
        'urlPrefix' => '', //一般不用填写，如采用了非规则的网站前缀（如 https://qscmf.test/project1），需要显式添加
        'area' => [
            'url' => '', //地区组件获取地区数据的api，一般不用填写，如需要自定义获取api，可通过填写覆盖默认的api
        ],
        'upload' => [
            'oss' => true //是否开启oss上传功能，true开启，false 关闭，默认为false
        ]
    ]
]
```



### 3.表单管理页

地址 http://[host]:[port]/admin/Form/index



## API说明

+ CusForm

  | 方法           | 说明                         | 参数                                                         | 返回值类型                                                   |
  | -------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | getInstance    | 生成CusForm实例对象          |                                                              |                                                              |
  | formSchema     | 自定义表单的jsonSchema字符串 | int form_id 表单主键                                         | string                                                       |
  | getApplySchema | 获取用户提交的表单数据       | int apply_id 用户数据的主键id<br />string mode edit(可编辑)\|readonly (只读) | stdClass json对象类型                                        |
  | editApply      | 编辑用户提交的表单数据       | int apply_id 用户数据的主键id<br />stdClass post_object 提交字段的json对象 | [flag, error] <br />falg为true或者false<br />false时error保存出错信息 |
  | submitApply    | 新增用户提交的表单数据       | int form_id 自定义表单主键id<br />stdClass post_object 提交的字段json对象 | [res, error] <br />res 如果是false error保存出错信息<br />否则 res 返回 apply_id |



+ Builder

  | 方法       | 说明                          | 参数                         | 返回值类型       |
  | ---------- | ----------------------------- | ---------------------------- | ---------------- |
  | __contruct | 构造函数                      | Object json_schema的json对象 | 无               |
  | build      | 生成新的json_schema的json对象 |                              | stdClass         |
  | addBefore  | 在自定义表单前插入字段组件    | BaseComponent 组件对象       | Builder 当前对象 |
  | addAfter   | 在自定义表单后插入字段组件    | BaseComponent 组件对象       | Builder 当前对象 |



+ BaseComponent 

  | 方法        | 说明                | 参数                                                         | 返回值类型                                                   |
  | ----------- | ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | __construct | 构造函数            | string sign  字段标识                                        |                                                              |
  | value       | 设置组件的值        | string \| stdClass \| array \| number value                  | BaseComponent 当前对象                                       |
  | type        | 组件值类型          | string type                                                  | BaseComponent 当前对象                                       |
  | title       | 标题                | string title                                                 | BaseComponent 当前对象                                       |
  | required    | 必填                | bool required 默认值true                                     | BaseComponent 当前对象                                       |
  | description | 说明                | string description                                           | BaseComponent 当前对象                                       |
  | default     | 默认值              | string \| stdClass \| array \| number default                | BaseComponent 当前对象                                       |
  | validator   | 验证器              | string validator  <br />可选项： email、enum、idcard、integer、number<br />、phone、required、url | BaseComponent 当前对象                                       |
  | enum        | 数据源              | array enum <br />[[ 'label' => '1分', 'value' => 1],[ 'label' => '2分', 'value' => 2]] | BaseComponent 当前对象                                       |
  | validate    | 验证                |                                                              | array<br />[true, ''] 验证通过<br />[false, '错误原因'] 验证失败 |
  | readonly    | 设置成只读          |                                                              | BaseComponent 当前对象                                       |
  | build       | 创建组件json_schema |                                                              | array<br />[sign, component]<br />sign: 组件标识<br />component: json_schema |



+ Input （BaseComponent实现类）

  | 方法        | 说明       | 参数                                            | 返回值类型     |
  | ----------- | ---------- | ----------------------------------------------- | -------------- |
  | __construct | 构造函数   | string sign 组件标识<br />string title 组件标题 |                |
  | placeholder | 占位符     | string placeholder 占位符                       | Input 当前对象 |
  | allowClear  | 是否可清空 | bool allowclear <br />true 启用可清空按钮       | Input 当前对象 |
  | maxLength   | 最大长度   | int maxLength                                   | Input 当前对象 |

  

+ Radio （BaseComponent实现类）

  | 方法        | 说明     | 参数                                            | 返回值类型 |
  | ----------- | -------- | ----------------------------------------------- | ---------- |
  | __construct | 构造函数 | string sign 组件标识<br />string title 组件标题 |            |

  

+ Textarea （BaseComponent实现类）

  | 方法        | 说明       | 参数                                            | 返回值类型        |
  | ----------- | ---------- | ----------------------------------------------- | ----------------- |
  | __construct | 构造函数   | string sign 组件标识<br />string title 组件标题 |                   |
  | placeholder | 占位符     | string placeholder 占位符                       | Textarea 当前对象 |
  | allowClear  | 是否可清空 | bool allowclear <br />true 启用可清空按钮       | Textarea 当前对象 |
  | showCount   | 展示字数   | bool showCount                                  | Textarea 当前对象 |

  



## 用例

### 1. 后台获取用户提交的表单数据
```php
$apply_id = 5; //qs_form_apply的主键，是用户提交的内容主键
$mode = 'edit'; //表单模式，edit 编辑  readonly 自读
$schema = CusForm::getInstance()->getApplySchema($apply_id, $mode);  
$builder = new FormilyBuilder($apply_id, $schema);
$builder->setMode($mode);

echo (string)$builder;
```


### 2. 生成自定义表单的jsonSchema

```php
use CusForm\Schema\Builder;
use CusForm\CusForm;

$json = CusForm::getInstance()->formSchema(1);
$builder = new Builder(json_decode($json));
$this->ajaxReturn($builder->build());
```



### 3.  保存表单内容

```php
use CusForm\Helper;
use CusForm\CusForm;

$data = Helper::iJson();
$form_id = (int)$data.form_id;
list($r, $errMsg) = CusForm::getInstance()->submitApply($form_id, $data);
if($r === false){
    $this->ajaxReturn(['status' => 0, 'info' => $errMsg]);
}
else {
    $this->ajaxReturn(['status' => 1, 'info' => '成功']);
}
```



### 4. 生成用户提交的内容 jsonSchema

```php
use CusForm\CusForm;
use CusForm\Schema\Builder;

$apply_id = 5;
$mode = 'readonly';

$json = CusForm::getInstance()->getApplySchema(5, 'readonly');
$builder = new Builder($json);

$this->ajaxReturn($builder->build());
```



### 5. 固定字段与自定义字段结合

```
use CusForm\CusForm;
use CusForm\Schema\Builder;
use CusForm\Schema\Components\Radio;
use CusForm\Schema\Components\Input;
use CusForm\Schema\Components\Textarea;

$json = CusForm::getInstance()->getApplySchema(5, 'readonly');
$builder = new Builder($json);
$bq1 = new Textarea('bq1', '问题1');
$bq1->maxLength(150)->showCount(true)->required()->default('非常棒了')->readonly();
$builder->addBefore($bq1); //将bq1固定字段添加到表单前

$bq2 = new Input('bq2', '问题2');
$bq2->placeholder('占位符')->allowClear(true)->required()->readonly();
$builder->addBefore($bq2);

$aq1 = new Radio('aq1', '问题3');
$aq1->enum([
    [
        'label' => '1分',
        'value' => 1
    ],
    [
        'label' => '2分',
        'value' => 2
    ],
    [
        'label' => '3分',
        'value' => 3
    ],
    [
        'label' => '4分',
        'value' => 4
    ],
    [
        'label' => '5分',
        'value' => 5
    ]
])->required()->default(5)->readonly();
$builder->addAfter($aq1); //将aq1固定字段添加到表单后
$this->ajaxReturn($builder->build());
```



### 6.前台获取自定义表单

```php
import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd'
import {Card, Slider, Rate, message} from 'antd'
import {Form, Area, Upload} from "@quansitech/qs-formily"

import 'antd/dist/antd.less'

const form = createForm()

const SchemaField = createSchemaField({
    components: {
      	Space,
        FormGrid,
        FormLayout,
        FormTab,
        FormCollapse,
        ArrayTable,
        ArrayCards,
        FormItem,
        DatePicker,
        Checkbox,
        Cascader,
        Editable,
        Input,
        NumberPicker,
        Switch,
        Password,
        PreviewText,
        Radio,
        Reset,
        Select,
        Submit,
        TimePicker,
        Transfer,
        TreeSelect,
        Upload,
        Card,
        Slider,
        Rate,
        Area
    },
  })

export const SchedulePage = () => {
    const [ formProps, setFormProps ] = React.useState();
    const [ schema, setSchema ] = React.useState();

    React.useEffect(() => {
        //获取jsonSchema
        fetch('schema').then(res => {
            setFormProps(res.form);
            setSchema(res.schema);
        })
    }, []);

    const handleSubmit = async (data) => {
        //to do submit
    }
    
    return <Form form={form} {...formProps} onAutoSubmit={handleSubmit}>
      <SchemaField schema={schema} />
      	<Submit block size="large">提交</Submit>}
    </Form>
}
```