package com.iotek.controller;


import com.iotek.module.ViewGddhDebt;
import com.iotek.service.ViewGddhDebtService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "${version}/viewGddhDebt")
@Api(value = "ViewGddhDebtController", description = "ViewGddhDebtController" ,produces = MediaType.APPLICATION_JSON_VALUE)
public class ViewGddhDebtController {
    @Resource
    private ViewGddhDebtService  viewGddhDebtService;


    @GetMapping("/searchByInfo")
    @ApiOperation(value="登录" ,httpMethod = "get",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name="ViewGddhDebt",value="登录信息",dataType = "ViewGddhDebt")
    public ModelAndView searchInfo( Long id,String priAccount){
        ViewGddhDebt viewGddhDebt=new ViewGddhDebt();
        viewGddhDebt.setId(id);
        viewGddhDebt.setPriAccount(priAccount);
       System.out.println(id+"   "+priAccount);
        ViewGddhDebt viewGddhDebtInfo = viewGddhDebtService.findByViewGddhDebtInfo(viewGddhDebt);
        ModelAndView mv=new ModelAndView("success");
        mv.addObject("ViewGddhDebt",viewGddhDebtInfo);

         return mv;
    }

    @GetMapping("/{id}")
    @ApiOperation(value="通过id查询贷款信息" ,httpMethod = "GET",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParam(name="id",value="信息id",dataType = "Long",required = true,paramType = "Path")
    public ModelAndView searchById(@PathVariable Long id){

        ViewGddhDebt byPrimaryKey = viewGddhDebtService.findByPrimaryKey(id);

        ModelAndView mv=new ModelAndView("showUser");
        mv.addObject("ViewGddhDebt",byPrimaryKey);
        return mv;

    }
    //http://localhost:8888/v1/viewGddhDebt/login
    @RequestMapping("/login")
    public ModelAndView index(){

        return  new ModelAndView("login");

    }


}
