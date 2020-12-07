package com.iotek.service.impl;

import com.iotek.dao.ViewGddhDebtMapper;
import com.iotek.module.ViewGddhDebt;
import com.iotek.service.ViewGddhDebtService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service(value = "viewGddhDebtService")
public class ViewGddhDebtServiceImpl implements ViewGddhDebtService {

    @Resource
    private ViewGddhDebtMapper viewGddhDebtMapper;


    @Override
    public ViewGddhDebt findByPrimaryKey(long id) {


        return viewGddhDebtMapper.selectByPrimaryKey(id);
    }

    @Override
    public ViewGddhDebt findByViewGddhDebtInfo(ViewGddhDebt viewGddhDebt) {


        return viewGddhDebtMapper.selectByViewGddhDebt(viewGddhDebt);
    }
}
