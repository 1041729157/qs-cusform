import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function CusForm(props){

    let initSelected = 0;
    props.selectOptions.forEach((option, index) => {
        if(option.value == props.type){
            initSelected = index;
            return;
        }
    });

    const [selected, setSelected] = useState(initSelected);
    const [CusComponent, setCusComponent] = useState(null);
    const [typeOption, setTypeOption] = useState(props.typeOption);

    useEffect(() => {
        const compName = props.selectOptions[selected].component;
        if(compName){
            import(`./${compName.toLowerCase()}.js`).then(comp => {
                setCusComponent(null);
                setCusComponent(comp);
            });
        }
        else{
            setCusComponent(null)
        }
    }, [selected]);

    const handleSelect = (e) => {
        setSelected(e.target.selectedIndex);
        setTypeOption('');
    }

    const Cus = CusComponent ? CusComponent.default : null;

    const update = (typeOption) => {
        setTypeOption(typeOption);
    }

    return (
        <>
            <div className="form-group item_type ">
                <label className="left control-label">类型：</label>
                <div className="right">
                    <select name="type" className="form-control select" onChange={handleSelect} value={props.selectOptions[selected].value}>
                        {props.selectOptions.map((option, index) => {
                            return <option key={index} value={option.value}>{option.text}</option>
                        })}
                    </select>
                </div>
            </div>
            {Cus &&
                (<div className="form-group item_options ">
                    <label className="left control-label">选项：</label>
                    <div className="right">
                        <input type="hidden" name="options" value={typeOption} />
                        <Cus update={update} option={typeOption} ></Cus>
                    </div>
                </div>)
            }
        </>
    );
}

function cusForm(id, opt){
    const defaultOpt = { selectOptions: [], type: '', typeOption: '' };
    Object.assign(defaultOpt, opt);
    ReactDOM.render(<CusForm selectOptions={defaultOpt.selectOptions} type={defaultOpt.type} typeOption={defaultOpt.typeOption} />, document.getElementById(id));
}

window.cusForm = cusForm;