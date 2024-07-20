package com.example.demo.service;

import com.example.demo.entity.Report;
import com.example.demo.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public List<Report> findAll() {
        return reportRepository.findAll();
    }

    public Report save(Report report) {
        return reportRepository.save(report);
    }
}
