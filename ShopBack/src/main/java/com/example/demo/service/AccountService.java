package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Integer id) {
        return accountRepository.findById(id).orElse(null);
    }

    public String deleteAccountById(Integer id) {
        String deletedAccount = getAccountById(id).getUsername();
        accountRepository.deleteById(id);
        return deletedAccount;
    }

    public Account updateAccountById(Integer id, Account account){
        Account accountOld = accountRepository.findById(id).orElse(null);
        accountOld.setUsername(account.getUsername());
        accountOld.setPassword(account.getPassword());
        accountOld.setEmail(account.getEmail());
        return accountRepository.save(accountOld);
    }

    public Account updateAccountByUsername(String username, Account account){
        Account accountOld = accountRepository.findByUsername(username).get();
        accountOld.setUsername(account.getUsername());
        accountOld.setPassword(account.getPassword());
        accountOld.setEmail(account.getEmail());
        return accountRepository.save(accountOld);
    }



    public Account getAccountByUsername(String username) {
        return accountRepository.findByUsername(username).orElse(null);
    }
}
