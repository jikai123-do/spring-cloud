package com.iotek.dao;

import java.util.List;

import com.iotek.module.ViewGddhDebt;
import com.iotek.module.ViewGddhDebtExample;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;


public interface ViewGddhDebtMapper {



    ViewGddhDebt  selectByPrimaryKey(Long id);

    ViewGddhDebt  selectByViewGddhDebt(ViewGddhDebt viewGddhDebt);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    int countByExample(ViewGddhDebtExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    int deleteByExample(ViewGddhDebtExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    int insert(ViewGddhDebt record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    int insertSelective(ViewGddhDebt record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    List<ViewGddhDebt> selectByExample(ViewGddhDebtExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    int updateByExampleSelective(@Param("record") ViewGddhDebt record, @Param("example") ViewGddhDebtExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table VIEW_GDDH_DEBT
     *
     * @mbggenerated Thu Oct 15 23:07:48 CST 2020
     */
    int updateByExample(@Param("record") ViewGddhDebt record, @Param("example") ViewGddhDebtExample example);
}